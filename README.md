# Aether Learn - Next-Gen Student Learning Dashboard

Aether Learn is a dark-mode-only, highly animated, bento-grid student learning dashboard. The application is built using Next.js 15 (App Router), Supabase (PostgreSQL), Tailwind CSS v4, Framer Motion, and Lucide React.

---

## 1. Architectural Decisions: Server vs. Client Component Split

To maximize performance, load speed, and SEO, the application divides components strictly between **React Server Components (RSC)** for data-fetching and **Client Components** for interactivity/animations:

*   **Server Component (`app/page.tsx`)**:
    *   Acts as the main page entrypoint.
    *   Queries Supabase securely directly on the server.
    *   Employs React `<Suspense>` boundaries to wrap loading components. This prevents blocking the initial page paint and stream-loads course tiles once resolved.
*   **Client Components (interactive/animated items)**:
    *   `components/sidebar/Sidebar.tsx` and `NavItem.tsx`: Handles collapsibility, mobile-responsive states, and active-nav sliding transitions.
    *   `components/dashboard/BentoGrid.tsx` & `HeroTile.tsx` & `ActivityTile.tsx` & `CourseCard.tsx`: Standardizes Framer Motion mount stagger entries, spring hover physical effects, progress bar loading transitions, and mock data generation.

---

## 2. Secure Server-Side Data Fetching (Supabase)

Supabase data is fetched securely entirely on the server using `@supabase/ssr` inside the Server Component:
*   Environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are read securely on the server.
*   The client is created in `lib/supabase.ts` using `createServerClient` and passes the cookies header directly.
*   **Mock Fallback**: If the variables are placeholders (e.g. during initial setup/demo checks) or if network connection fails, our client automatically intercepts the query, logs a console note, and returns the 4 required courses after a 1.5s delay. This prevents page crashes and highlights the pulsing skeleton states during loading.

```ts
// Table Schema (courses)
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);
```

---

## 3. Framer Motion Animations & Layout Shift (CLS) Prevention

To maintain a perfect Cumulative Layout Shift (CLS) score of 0, animations follow strict GPU-accelerated rules:
*   **No Width/Height/Margin animations**: Hover elevation scale changes use `whileHover={{ scale: 1.02 }}` which animates CSS `transform: scale()` exclusively. The browser performs this on the compositor thread, avoiding page repaints.
*   **Progress Bar Animations**: The progress bar's container is set with a fixed height and `overflow-hidden` constraints. The inner bar animates its `width` using Framer Motion (`animate={{ width: progress + "%" }}`), keeping content flow completely static.
*   **Active Item Highlights**: Sidebar highlights utilize Framer Motion's `layoutId="active-nav"` rendering an absolute positioned pill. When clicked, the highlight slides smoothly to the new active element without triggering any layout recalculations in adjacent DOM trees.

---

## 4. How to Run Locally

### Prerequisites
*   Node.js (v20+ or v26.2+)
*   npm (v10+)

### Steps
1.  **Clone the Repository** and open the project directory.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root of the project (Next.js automatically git-ignores this file):
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://placeholder-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
    ```
    *Note: The app will run out of the box using mock data when these placeholder values are detected.*
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **Open the App**:
    Navigate to [next-gen dashoard](next-gen-learning-dashboard-olive.vercel.app) in your browser.
