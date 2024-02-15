import { currentUser } from '@clerk/nextjs'

import AccountProfile from '@/components/forms/AccountProfile'

async function Page() {
  const user = await currentUser()
  if (!user) return null // to avoid typescript warnings

  //data from database

  const userInfo = {}

  //data from Clerk

  const userData = {
    id: user?.id,
    //    objectId: userInfo?._id,
    //    username: userInfo?.username || user?.username,
    //    name: userInfo?.name || user?.firstName || "" ,
    //    image: userInfo?.image || user?.imageUrl,
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <p className="text-base-regular text-light-2 mt-3">
        Complete your profile now, to use Threads.
      </p>

      <section className=" mt-9 p-10">
        <AccountProfile />
      </section>
    </main>
  )
}

export default Page
