import { siteConfig } from '@/config/site'

export default function Page(){
  return (
    <div className="container-site py-24">
      <h1 className="font-display text-3xl mb-4">Terms & Conditions</h1>
      <p className="text-muted mb-4">Welcome to {siteConfig.name}. By accessing our website, you agree to these terms.</p>
      <p className="text-muted">For any questions, please contact us at {siteConfig.contact.email}.</p>
    </div>
  )
}
