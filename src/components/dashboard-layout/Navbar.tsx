import { UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'

function Navbar() {
  const { userId } = auth()

  return (
    <div className="flex h-14 w-full items-center justify-center border border-gray-300 bg-white  px-2  dark:border-gray-600 dark:bg-neutral-950 md:px-12  lg:px-48">
      <div className=" flex gap-6 ">
        {userId ? (
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <Button asChild size="sm" className="px-6  ">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
