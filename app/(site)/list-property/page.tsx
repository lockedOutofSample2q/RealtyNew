import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function Page(){
  return (
    <div className="container-site py-24">
      <h1 className="font-display text-3xl mb-4">List Your Property with {siteConfig.name}</h1>
      <p className="text-muted mb-6">Create a listing quickly. Reach qualified buyers through our network.</p>
      <Link href="/contact" className="px-5 py-3 bg-black text-white rounded-xl">Contact Us to List</Link>
    </div>
  )
}
