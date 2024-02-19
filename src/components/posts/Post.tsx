import Image from 'next/image'
import Link from 'next/link'
import { Card } from '../ui/card'
import { auth, currentUser } from '@clerk/nextjs'
import { AspectRatio } from '../ui/aspect-ratio'

async function Post() {
  const { userId } = auth()
  const user = await currentUser()
  //   const username = post.user.username;
  console.log(user)
  if (!userId) return null

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <div className="mr-4">
            <h3>User Avatar</h3>
          </div>

          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">Post- Username</span>
              <span
                className="text-xs font-medium text-neutral-500
                      dark:text-neutral-400
                    "
              >
                •
              </span>
            </p>
            <p className="text-xs font-medium text-black dark:text-white">
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      </div>
      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src="/neil.jpg"
          alt="Post Image"
          width={90}
          height={160}
          className="object-cover sm:rounded-md"
        />
      </Card>
    </div>
  )
}

export default Post
