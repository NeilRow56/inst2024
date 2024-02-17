import { UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { Heart, Search } from 'lucide-react'

function Navbar() {
  const { userId } = auth()

  return (
    <div className="flex h-14 w-full items-center justify-center gap-8 border  border-gray-300 bg-white px-2 dark:border-gray-600 dark:bg-neutral-950 md:px-12  lg:px-48">
      <div className="flex items-center gap-x-2 rounded-md bg-zinc-100 px-3.5 py-1.5 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
        />
      </div>
      <Button size="icon" variant="ghost">
        <Heart className="text-red-500" />
      </Button>
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
