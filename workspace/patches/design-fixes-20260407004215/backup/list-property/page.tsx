import Link from 'next/link'
import Layout from '@/components/layout/Navbar'
export default function Page(){
  return (
    <div className="container-site py-24">
      <h1 className="font-display text-3xl mb-4">List Your Property</h1>
      <p className="text-muted mb-6">Create a listing quickly. This is a placeholder page styled with site tokens.</p>
      <Link href="/contact" className="px-5 py-3 bg-black text-white rounded-xl">Contact Us to List</Link>
    </div>
  )
}
