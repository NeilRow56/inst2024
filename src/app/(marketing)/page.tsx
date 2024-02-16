import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
  const { userId } = auth()

  if (userId) redirect('/dashboard')
  return (
    <section className="flex h-[90vh] items-center justify-center bg-background">
      <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <span className="w-auto rounded-full bg-secondary px-6 py-3">
              <span className="text-sm font-medium text-primary">
                Sort your notes easily
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Create Notes with ease
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base text-secondary-foreground lg:text-xl">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et d
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-sm justify-center">
            <Button asChild>
              <Link href="/sign-up">Sign up for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
