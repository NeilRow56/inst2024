import { SwitchCamera } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

function Logo() {
  return (
    <Link
      href={'/dashboard'}
      className={buttonVariants({
        className:
          'navLink !mb-10 hidden md:flex lg:!p-0 lg:hover:bg-transparent',
        variant: 'ghost',
        size: 'lg',
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 text-primary lg:hidden" />
      {/* <p
        className={` hidden bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent lg:block`}
      >
        INST24
      </p> */}
      <h1 className="text-3xl font-bold">Inst </h1>
      <span className="text-3xl text-primary">2024</span>
    </Link>
  )
}

export default Logo
