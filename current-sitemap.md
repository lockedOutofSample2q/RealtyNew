```markdown
# Amritpal Singh Advisory - Complete Site Structure & Sitemap

## Overview
Next.js App Router application with two main route groups:
- **Public Routes:** Grouped under `(site)` route group for consistent layout (authenticated routes use separate `admin` group)
- **Admin Routes:** Protected administration panel under `/admin`

Database: Supabase with property listings, agent profiles, leads/subscribers, and content via ContentLayer (MDX)

---

## 📱 Public Routes — Accessible to All Users

### 1. **Home Page**
- **Route:** `/`
- **File:** [app/(site)/page.tsx](app/(site)/page.tsx)
- **Purpose:** Main landing page showcasing the advisory business
- **Features:**
  - Hero section with call-to-action
  - About section
  - Properties carousel (featured listings)
  - Services section
  - FAQ section
  - Contact section
- **Data:** Fetches featured property, latest sales listings, and rental/land listings from Supabase
- **Revalidation:** ISR every 60 seconds

### 2. **About Page**
- **Route:** `/about`
- **File:** [app/(site)/about/page.tsx](app/(site)/about/page.tsx)
- **Page Title:** "About | The Background No Other Advisor in Mohali Can Claim"
- **Purpose:** Comprehensive company profile and advisor background
- **Components:**
  - About hero section
  - Statistics display (10+ years experience, 500+ properties, etc.)
  - Text section with business philosophy
  - Process breakdown (how the advisory works)
  - Leadership/team information

### 3. **Blog Listing Page**
- **Route:** `/blog`
- **File:** [app/(site)/blog/page.tsx](app/(site)/blog/page.tsx)
- **Page Title:** "Blog | Market Insights | Amritpal Singh Advisory"
- **Purpose:** Display all published blog articles
- **Description:** "100 articles on Mohali real estate: sector intelligence, buyer protection, investment analysis, and legal rights"
- **Features:**
  - Lists all MDX blog posts sorted by date (newest first)
  - Client-side filtering and sorting via BlogClient component
  - Links to individual posts

### 4. **Blog Post Detail Page**
- **Route:** `/blog/[slug]`
- **File:** [app/(site)/blog/[slug]/page.tsx](app/(site)/blog/[slug]/page.tsx)
- **Dynamic:** Uses slug parameter to fetch specific post
- **Purpose:** Display individual MDX blog article with full formatting
- **Features:**
  - Generates static params from ContentLayer posts
  - Dynamic metadata generation (title, description, OpenGraph image)
  - Custom MDX components (Callout boxes with tip/info/warning variants)
  - Sidebar navigation
  - Author and date information
  - Reading time estimate
  - Internal link navigation

### 5. **Property Detail Page**
- **Route:** `/[slug]`
- **File:** [app/(site)/[slug]/page.tsx](app/(site)/[slug]/page.tsx)
- **Dynamic:** Uses property slug to fetch listing data
- **Purpose:** Display comprehensive property details with images, map, and inquiry form
- **Features:**
  - Property carousel/gallery
  - Detailed property specifications and amenities
  - Interactive map (PropertyDetailMap - dynamically loaded)
  - Inquiry form
  - Price display (formatted by currency context)
  - Share property functionality
  - Nearby landmarks information
  - RERA compliance and developer details
- **Data Source:** Supabase property table
- **Metadata:** Dynamic OpenGraph images and descriptions
- **Revalidation:** ISR every 60 seconds

### 6. **Properties Listing Page**
- **Route:** `/properties`
- **File:** [app/(site)/properties/page.tsx](app/(site)/properties/page.tsx)
- **Page Title:** "Properties in Mohali and Tricity: Verified, Evaluated, Honestly Presented"
- **Description:** "Verified property listings in Mohali and Tricity: pre-launch, resale, and ready possession"
- **Purpose:** Browse all available properties (sale listings)
- **Features:**
  - Filters by listing type ("properties" = sale listings)
  - Sorting by featured status and date
  - Search and filter UI (PropertySearchBar)
  - Property grid display
- **Data Source:** Supabase
- **Revalidation:** ISR every 60 seconds

### 7. **Land & Plots Listing Page**
- **Route:** `/lands`
- **File:** [app/(site)/lands/page.tsx](app/(site)/lands/page.tsx)
- **Page Title:** "Land and Plot Listings in Punjab: GMADA, Licensed, and Agricultural"
- **Description:** "GMADA plots, licensed residential plots, and agricultural land in Mohali and Punjab"
- **Purpose:** Browse land and plot listings
- **Features:**
  - Filters by multiple listing types (sale, lands, off-plan)
  - Specialized content for land/plot buyers
  - Title verification status display
- **Data Source:** Supabase (multi-type filter query)
- **Revalidation:** ISR every 60 seconds

### 8. **Contact Page**
- **Route:** `/contact`
- **File:** [app/(site)/contact/page.tsx](app/(site)/contact.tsx)
- **Page Title:** "Contact Us | Amritpal Singh Advisory"
- **Description:** "Speak directly with Amritpal Singh, property advisor"
- **Purpose:** Contact form and information page
- **Components:**
  - ContactClient (form submission)
  - ContactMap (office location)
- **Features:** Direct contact form, maps integration, office details

### 9. **Booking/Consultation Page**
- **Route:** `/booking`
- **File:** [app/(site)/booking/page.tsx](app/(site)/booking/page.tsx)
- **Page Title:** "Book a Consultation | Amritpal Singh Advisory"
- **Description:** "Book a free 15-minute property consultation"
- **Purpose:** Calendar/scheduling interface for consultations
- **Components:**
  - BookingClient (likely Calendly or similar integration)
- **Call-to-Action:** Free 15-minute property consultation with no sales pitch

### 10. **List Your Property Page**
- **Route:** `/list-your-property`
- **File:** [app/(site)/list-your-property/page.tsx](app/(site)/list-your-property/page.tsx)
- **Page Title:** "List Your Property | Amritpal Singh Advisory"
- **Description:** "List your Mohali property with pre-qualified HNI, CXO, and NRI buyers"
- **Purpose:** Marketing page for property owners to list their properties
- **Features:**
  - Professional marketing copy emphasizing buyer quality
  - Three key value propositions (Global Reach, Professional Valuation, etc.)
  - Call-to-action linking to contact form
  - Highlights network of pre-qualified buyers (not portal browsers)

### 11. **List Property (Legacy)**
- **Route:** `/list-property`
- **File:** [app/(site)/list-property/page.tsx](app/(site)/list-property/page.tsx)
- **Status:** Placeholder (legacy)
- **Purpose:** Placeholder page - likely redirect to `/list-your-property`
- **Contains:** Simple placeholder with link to `/contact`

### 12. **Mortgage Calculator Tool**
- **Route:** `/mortgage-calculator`
- **File:** [app/(site)/mortgage-calculator/page.tsx](app/(site)/mortgage-calculator/page.tsx)
- **Page Title:** "Mortgage Calculator"
- **Purpose:** Interactive mortgage calculation tool
- **Features:**
  - Currency selection (AED, USD, EUR)
  - Residency type selector (affects Max LTV: National 85%, Resident 80%, Non-resident 75%)
  - Price, down payment percentage, interest rate, and loan term inputs
  - Real-time calculation display
  - Monthly payment breakdown
  - Total interest calculation
  - Principal vs Interest visualization
  - Client-side component ("use client") for interactivity

### 13. **Relocation Services Page**
- **Route:** `/relocation`
- **File:** [app/(site)/relocation/page.tsx](app/(site)/relocation/page.tsx)
- **Page Title:** "Relocation Services | Amritpal Singh Advisory"
- **Description:** "Relocating to Mohali or Tricity? Property selection, documentation guidance, and community orientation"
- **Purpose:** Marketing page for relocation services
- **Features:**
  - Three-section service breakdown:
    1. Property Selection & Due Diligence
    2. Documentation Guidance
    3. Community Orientation
  - Link to booking consultation
  - Emphasis on first-time homebuyer support

### 14. **Privacy Policy Page**
- **Route:** `/privacy`
- **File:** [app/(site)/privacy/page.tsx](app/(site)/privacy/page.tsx)
- **Page Title:** "Privacy Policy"
- **Purpose:** Legal privacy statement
- **Status:** Placeholder - "Replace with legal text"

### 15. **Cookie Policy Page**
- **Route:** `/cookies`
- **File:** [app/(site)/cookies/page.tsx](app/(site)/cookies/page.tsx)
- **Page Title:** "Cookie Policy"
- **Purpose:** Information about cookies used on the site
- **Status:** Placeholder - "Describe cookies used on the site"

### 16. **Terms & Conditions Page**
- **Route:** `/terms`
- **File:** [app/(site)/terms/page.tsx](app/(site)/terms/page.tsx)
- **Page Title:** "Terms & Conditions"
- **Purpose:** Terms of service and legal terms
- **Status:** Placeholder - "Replace with legal text"

### 17. **Imprint Page**
- **Route:** `/imprint`
- **File:** [app/(site)/imprint/page.tsx](app/(site)/imprint/page.tsx)
- **Purpose:** Legal imprint with company details (European requirement)
- **Status:** Placeholder - "Company details and legal imprint"

---

## 🔐 Admin Routes — Protected Dashboard (Requires Authentication)

### Admin Route Group
- **Base Path:** `/admin`
- **Authentication:** Supabase auth required
- **Function:** Content management, customer leads, and configuration
- **Layout:** [app/admin/layout.tsx](app/admin/layout.tsx)

### 1. **Admin Login Page**
- **Route:** `/admin/login`
- **File:** [app/admin/login/page.tsx](app/admin/login/page.tsx)
- **Purpose:** Authentication gate for admin panel
- **Features:**
  - Email/password login form
  - Integrates with Supabase Auth
  - Redirects to dashboard on successful login
  - Toast error notifications on invalid credentials
- **Client Component:** "use client"

### 2. **Admin Dashboard**
- **Route:** `/admin/dashboard`
- **File:** [app/admin/dashboard/page.tsx](app/admin/dashboard/page.tsx)
- **Purpose:** Main admin control center with key metrics
- **Features:**
  - Stats cards displaying:
    - Total properties count
    - Total leads count
    - Total subscribers count
    - New leads (status = "new") count
  - Recent leads list
  - Quick navigation to other admin sections
- **Data Source:** Supabase (properties, leads, subscribers tables)
- **Revalidation:** ISR every 30 seconds

### 3. **Properties Management**
- **Route:** `/admin/properties`
- **File:** [app/admin/properties/page.tsx](app/admin/properties/page.tsx)
- **Purpose:** Full CRUD interface for property listings
- **Features:**
  - View all properties in table format
  - Search/filter functionality
  - Add new property button
  - Individual edit buttons
  - Delete property buttons
  - Real-time sync with front-end (properties appear automatically)
- **Components:** Client component with state management for properties list
- **Data Source:** Supabase properties table
- **Notes:** Each property saved to Supabase + auto-appears on site

### 4. **Create New Property**
- **Route:** `/admin/properties/new`
- **File:** [app/admin/properties/new/page.tsx](app/admin/properties/new/page.tsx)
- **Purpose:** Form page for creating new property listings
- **Component:** PropertyForm component (_components/PropertyForm)
- **Features:**
  - Full property form with all required fields
  - Image upload integration (ImageUploader)
  - Location/map integration
  - Amity selection
  - Price and listing type selection
  - Description and specifications

### 5. **Edit Property**
- **Route:** `/admin/properties/[id]`
- **File:** [app/admin/properties/[id]/page.tsx](app/admin/properties/[id]/page.tsx)
- **Dynamic:** Property ID from URL parameter
- **Purpose:** Edit existing property details and metadata
- **Features:**
  - Loads property by ID from Supabase
  - Full edit form (PropertyForm component)
  - Shows 404 (notFound) if property doesn't exist
  - Server component with dynamic rendering
- **Data Source:** Supabase (single property fetch by ID)

### 6. **Blog Management**
- **Route:** `/admin/blog-posts`
- **File:** [app/admin/blog-posts/page.tsx](app/admin/blog-posts/page.tsx)
- **Purpose:** Blog post management interface
- **Features:**
  - Lists all published MDX blog posts
  - Displays post count
  - Shows formatted dates and titles
  - Links to edit on GitHub (MDX files stored in GitHub)
  - Instructions for adding new blog posts
  - External link to GitHub repo
- **Data Source:** ContentLayer (MDX files from content/blog/)
- **Notes:** Blog posts are MDX files, not database stored - managed via GitHub

### 7. **Leads CRM**
- **Route:** `/admin/leads`
- **File:** [app/admin/leads/page.tsx](app/admin/leads/page.tsx)
- **Purpose:** Customer inquiry management and lead status tracking
- **Features:**
  - View all leads/inquiries
  - Filter by status (new, contacted, qualified, closed)
  - Contact information display (email, phone, message)
  - Status update dropdown
  - Color-coded status badges
  - Timestamp tracking
- **Status Options:** new (gold), contacted (blue), qualified (green), closed (gray)
- **Data Source:** Supabase leads table
- **Components:** Client component with real-time filtering
- **Icons:** Mail, Phone, MessageSquare (for contact methods)

### 8. **Agents Management**
- **Route:** `/admin/agents`
- **File:** [app/admin/agents/page.tsx](app/admin/agents/page.tsx)
- **Purpose:** Listing agent profile management
- **Features:**
  - Add new agents
  - Edit agent information
  - Delete agents
  - Agent fields:
    - Name, phone, email
    - Languages spoken
    - Website URL
    - Photo/avatar
  - Selected agents appear in property dropdown selector
- **Data Source:** Supabase agents table
- **Components:** Client component with form modal
- **Styling:** Gold accent (#C9A84C) theme, light form inputs

### 9. **Settings Dashboard**
- **Route:** `/admin/settings`
- **File:** [app/admin/settings/page.tsx](app/admin/settings/page.tsx)
- **Purpose:** Configuration and customization settings index
- **Features:**
  - Documents all editable configuration locations
  - Links to source config files:
    - `config/site.ts` - Brand, contact info, social links, hero text, FAQ, services
    - `tailwind.config.ts` - Active color scheme
    - `public/` - Public assets and favicon
    - Other config areas
  - Shows where to edit: brand name, tagline, contact details, social media, hero section, about stats, services, FAQ, navigation, footer
- **Component:** Server component listing config sections with file paths and descriptions
- **Note:** Future version could support DB-backed config table

---

## 📊 Route Structure Visualization

```
app/
├── (site)/                          # Public routes (route group)
│   ├── page.tsx                     # / (Home)
│   ├── about/
│   │   └── page.tsx                 # /about
│   ├── blog/
│   │   ├── page.tsx                 # /blog
│   │   └── [slug]/
│   │       └── page.tsx             # /blog/[slug]
│   ├── [slug]/                      # Property detail route (dynamic)
│   │   └── page.tsx                 # /[slug]
│   ├── properties/
│   │   └── page.tsx                 # /properties
│   ├── lands/
│   │   └── page.tsx                 # /lands
│   ├── contact/
│   │   └── page.tsx                 # /contact
│   ├── booking/
│   │   └── page.tsx                 # /booking
│   ├── list-property/
│   │   └── page.tsx                 # /list-property
│   ├── list-your-property/
│   │   └── page.tsx                 # /list-your-property
│   ├── mortgage-calculator/
│   │   └── page.tsx                 # /mortgage-calculator
│   ├── relocation/
│   │   └── page.tsx                 # /relocation
│   ├── privacy/
│   │   └── page.tsx                 # /privacy
│   ├── cookies/
│   │   └── page.tsx                 # /cookies
│   ├── terms/
│   │   └── page.tsx                 # /terms
│   ├── imprint/
│   │   └── page.tsx                 # /imprint
│   └── layout.tsx                   # (site) layout wrapper
│
├── admin/                           # Admin routes (protected)
│   ├── login/
│   │   └── page.tsx                 # /admin/login
│   ├── dashboard/
│   │   └── page.tsx                 # /admin/dashboard
│   ├── properties/
│   │   ├── page.tsx                 # /admin/properties
│   │   ├── new/
│   │   │   └── page.tsx             # /admin/properties/new
│   │   ├── [id]/
│   │   │   └── page.tsx             # /admin/properties/[id]
│   │   └── _components/
│   │       └── PropertyForm.tsx
│   ├── blog-posts/
│   │   └── page.tsx                 # /admin/blog-posts
│   ├── leads/
│   │   └── page.tsx                 # /admin/leads
│   ├── agents/
│   │   └── page.tsx                 # /admin/agents
│   ├── settings/
│   │   └── page.tsx                 # /admin/settings
│   └── layout.tsx                   # admin layout wrapper
│
├── api/                             # API routes
│   ├── contact/                     # POST: Contact form submission
│   ├── subscribe/                   # POST: Newsletter subscription
│   └── upload/                      # POST: Image uploads
│
├── layout.tsx                       # Root layout
├── not-found.tsx                    # 404 page
└── sitemap.ts                       # Dynamic sitemap generation
```

---

## 🔗 Key Features by Route Category

### **Content Management**
- Blog posts via MDX (ContentLayer) - not database driven
- Properties fully database-driven (CRUD via admin)
- Agents database with selection in properties
- Leads/subscribers tracking

### **Marketing Pages**
- Home, About, Blog provide SEO content
- List Your Property, Relocation Services drive lead generation
- Services, FAQs, team leadership build trust

### **Tools & Resources**
- Mortgage Calculator (interactive)
- Property search and filters
- Map integration for property location

### **Customer Engagement**
- Contact form
- Booking/consultation scheduling
- Lead inquiry tracking in admin

### **Legal & Compliance**
- Privacy, Cookies, Terms, Imprint pages
- RERA compliance messaging on properties

---

## 📈 Data Flow Architecture

```
Frontend (Public)
├── Home → fetches featured, latest sales, lands from Supabase
├── Properties & Lands → database queries with filters
├── Blog → built from MDX files (ContentLayer) at build time
├── Forms (Contact, Booking) → POST to API routes
└── Dynamic routes [slug] → fetch from Supabase

Admin Dashboard
├── Properties CRUD → Supabase operations
├── Leads CRM → read/update Supabase leads table
├── Agents → full CRUD on Supabase agents
├── Blog → GitHub file management (external)
└── Settings → configuration file references

Databases: Supabase (properties, leads, subscribers, agents)
Static Content: MDX files (blog posts)
Config: TypeScript files (site.ts, tailwind.config.ts)
```

---

## 🔑 Key Metadata & Titles

All pages include proper Next.js metadata for SEO:

| Route | Title | Description |
|-------|-------|-------------|
| / | (Generated from config) | Home page content |
| /about | "About \| The Background..." | 10+ years experience |
| /blog | "Blog \| Market Insights..." | 100+ real estate articles |
| /blog/[slug] | (Dynamic post title) | (Dynamic post excerpt) |
| /[slug] | (Property title) | (Property description) |
| /properties | "Properties in Mohali..." | Verified listings |
| /lands | "Land and Plot Listings..." | GMADA, licensed, agricultural |
| /contact | "Contact Us \| Advisory" | Direct contact info |
| /booking | "Book a Consultation..." | Free 15-min consultation |
| /list-your-property | "List Your Property..." | Pre-qualified buyers |
| /mortgage-calculator | "Mortgage Calculator" | Interest rate tool |
| /relocation | "Relocation Services..." | Moving guidance |

---

## 📝 Summary

**Total Routes:** 26 page.tsx files  
**Public Routes:** 17 (under `(site)`)  
**Admin Routes:** 9 (under `admin`)  

**Architecture:** Next.js App Router with route groups, dynamic routes `[slug]` & `[id]`, server/client hybrid rendering, ISR revalidation, and Supabase backend.
```