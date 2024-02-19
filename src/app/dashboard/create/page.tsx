'use client'

import useMount from '@/app/hooks/useMount'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Post } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { SingleImageDropzone } from '@/components/forms/SingleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'

import { Loader2, XCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { CreatePostValues, createPostSchema } from '@/actions/posts/schemas'

function CreatePage() {
  const pathname = usePathname()
  const isCreatePage = pathname === '/dashboard/create'
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [fileUrl, setFileUrl] = useState<string | undefined>()
  const [imageIsDeleting, setImageIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { edgestore } = useEdgeStore()
  const { toast } = useToast()
  const router = useRouter()
  const mount = useMount()

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      caption: '',
      fileUrl: undefined,
    },
  })

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    if (typeof fileUrl === 'string') {
      form.setValue('fileUrl', fileUrl, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl])

  const handleImageDelete = async (fileUrl: string) => {
    setImageIsDeleting(true)
    await edgestore.publicFiles.delete({
      url: fileUrl,
    })

    setFileUrl('')
    toast({
      variant: 'success',
      description: 'Image removed',
    })
    setImageIsDeleting(false)
  }

  if (!mount) return null

  async function onSubmit(values: CreatePostValues) {
    // alert(JSON.stringify(values, null, 2))
    console.log(values)
  }

  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <h3 className="text-primary">Upload an Image *</h3>
                    <FormControl>
                      <FormControl>
                        {fileUrl ? (
                          <>
                            <div className="relative mt-4 max-h-[400px] min-h-[200px] min-w-[200px] max-w-[400px]">
                              <Image
                                fill
                                src={fileUrl}
                                alt="Hotel Image"
                                className="object-contain"
                              />
                              <Button
                                onClick={() => handleImageDelete(fileUrl)}
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-[-12px] top-0"
                              >
                                {imageIsDeleting ? <Loader2 /> : <XCircle />}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <section className="mx-auto my-8 w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
                              <div className=" flex flex-col">
                                <div className="mx-auto">
                                  <SingleImageDropzone
                                    width={200}
                                    height={200}
                                    value={file}
                                    onChange={(file) => {
                                      setFile(file)
                                    }}
                                  />
                                  {progress < 100 && (
                                    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                      <div
                                        className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                                        style={{ width: '85' }}
                                      >
                                        {' '}
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex justify-center">
                                    <button
                                      className="mt-1 rounded-lg bg-blue-500 px-2 py-1 text-gray-50"
                                      onClick={async () => {
                                        if (file) {
                                          const res =
                                            await edgestore.publicFiles.upload({
                                              file,
                                              onProgressChange: (progress) => {
                                                console.log(progress)
                                                setProgress(progress)
                                              },
                                            })
                                          // you can run some server action or api here
                                          // to add the necessary data to your database
                                          console.log(res)
                                          setFileUrl(res?.url)
                                          toast({
                                            variant: 'success',
                                            description: '🚀 Upload complete',
                                          })
                                        }
                                      }}
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </>
                        )}
                      </FormControl>
                    </FormControl>
                    <FormDescription>Upload a picture to post.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreatePage
