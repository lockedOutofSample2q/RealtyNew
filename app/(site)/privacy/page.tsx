import { siteConfig } from '@/config/site'

export default function Page(){
  return (
    <div className="container-site py-24">
      <h1 className="font-display text-3xl mb-4">Privacy Policy</h1>
      <p className="text-muted mb-4">At {siteConfig.name}, we are committed to protecting your privacy.</p>
      <p className="text-muted">If you have any questions about how we handle your data, please contact us at {siteConfig.contact.email}.</p>
    </div>
  )
}
