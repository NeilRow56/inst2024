import Navbar from '@/components/dashboard-layout/Navbar'
import Sidebar from '@/components/dashboard-layout/Sidebar'
import React, { ReactNode } from 'react'
import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface getDataProps {
  email: string
  id: string
  firstName: string | undefined | null
  lastName: string | undefined | null
  imageUrl: string | undefined | null
}

async function getData({
  email,
  id,
  firstName,
  lastName,
  imageUrl,
}: getDataProps) {
  const user = await db.user.findUnique({
    where: {
      id,
      email,
    },
    select: {
      id: true,
    },
  })

  if (!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`
    await db.user.create({
      data: {
        id: id,
        email: email,
        name: name,
        imageUrl: imageUrl,
      },
    })
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    return redirect('/sign-in')
  }

  const { sessionClaims } = auth()

  const firstName = sessionClaims?.firstName
  const email = sessionClaims?.email
  const userId = sessionClaims?.id
  const lastName = sessionClaims?.lastName
  const imageUrl = sessionClaims?.imageUrl

  await getData({
    email: email as string,
    firstName: firstName as string,
    id: userId as string,
    lastName: lastName as string,
    imageUrl: imageUrl as string,
  })
  return (
    <div className="relative flex h-screen flex-col   md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none border-gray-600 md:border-r lg:w-64">
        <Sidebar />
      </div>
      <div className="flex  w-full flex-col">
        <Navbar />
        <div className="mx-auto mt-20 w-full max-w-7xl flex-1 flex-grow p-4 sm:p-6 md:mt-0 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}
