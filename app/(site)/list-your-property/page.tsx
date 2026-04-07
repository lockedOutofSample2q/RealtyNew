import Link from 'next/link'
export default function Page(){
  return (
    <div className="container-site py-24">
      <h1 className="font-display text-3xl mb-4">List Your Property</h1>
      <p className="text-muted mb-6">Coming soon. Use this page to submit property details.</p>
      <Link href="/contact" className="px-5 py-3 bg-black text-white rounded-xl">Get Started</Link>
    </div>
  )
}
