import { redirect } from 'next/navigation'

async function HomePage() {
  return redirect('/dashboard')
}

export default HomePage
