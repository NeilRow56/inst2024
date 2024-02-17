'use client'

import { Button } from '@/components/ui/button'

import { Loader2, Trash } from 'lucide-react'
import { useFormStatus } from '../../../react-dom-shim'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit bg-orange-800">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit bg-orange-800" type="submit">
          Save Now
        </Button>
      )}
    </>
  )
}
