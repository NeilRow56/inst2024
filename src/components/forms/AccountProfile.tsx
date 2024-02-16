'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserValidation } from '@/lib/validations/user'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'

import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'

interface AccountProfileProps {
  user: {
    id: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { startUpload } = useUploadThing('media')

  const [files, setFiles] = useState<File[]>([])

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : '',
      name: user?.name ? user.name : '',
      username: user?.username ? user.username : '',
      bio: user?.bio ? user.bio : '',
    },
  })

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo

    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged) {
      const imgRes = await startUpload(files)

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url
      }
    }
    //To update user profile

    // await updateUser({
    //   name: values.name,
    //   path: pathname,
    //   username: values.username,
    //   userId: user.id,
    //   bio: values.bio,
    //   image: values.profile_photo,
    // })

    if (pathname === '/profile/edit') {
      router.back()
    } else {
      router.push('/')
    }
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 ">
              <FormLabel className="account-form_image-label ">
                {field.value ? (
                  <div className="">
                    <Image
                      src={field.value}
                      alt="profile_icon"
                      width={40}
                      height={40}
                      priority
                      className=" max-h-[95vh] max-w-[95vw] rounded-2xl"
                    />
                  </div>
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="text-base-semibold flex-1 text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input text-primary"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col  gap-3">
              <FormLabel className="w-[75px]">Name</FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Input
                  type="text"
                  className="border-dark-4 bg-dark-3 text-light-1 !important no-focus border"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="   w-[75px]">Username</FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Input
                  type="text"
                  className="border-dark-4 bg-dark-3 text-light-1 !important no-focus border"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col  gap-3">
              <FormLabel className="w-[75px]   ">Bio</FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Textarea
                  rows={10}
                  className="border-dark-4 bg-dark-3 text-light-1 !important no-focus border"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">{btnTitle}</Button>
      </form>
    </Form>
  )
}

export default AccountProfile
