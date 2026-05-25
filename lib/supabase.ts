import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Course } from '@/types'

const MOCK_COURSES: Course[] = [
  { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", title: "Advanced React Patterns", progress: 75, icon_name: "Code2", created_at: new Date().toISOString() },
  { id: "2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee", title: "System Design Fundamentals", progress: 42, icon_name: "Layers", created_at: new Date().toISOString() },
  { id: "3b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef", title: "Data Structures & Algorithms", progress: 90, icon_name: "GitBranch", created_at: new Date().toISOString() },
  { id: "4b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bf0", title: "UI/UX Design Principles", progress: 30, icon_name: "Palette", created_at: new Date().toISOString() }
]

function isPlaceholderConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !url || !key || url.includes('placeholder') || url.includes('your_supabase')
}

/**
 * Custom Supabase Client Wrapper
 * Implements standard from().select() query capabilities.
 * If credentials are placeholders or if query fails (e.g. table is not seeded),
 * it falls back to mock courses data after a 1.5s delay to trigger the skeleton screens.
 */
export const supabase = {
  from(table: string) {
    return {
      async select(query = '*') {
        // Artificial delay of 1.5s to let the user see the gorgeous Skeleton loader!
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (isPlaceholderConfig()) {
          console.log("[Supabase Server Client] Using placeholder credentials. Falling back to mock data.")
          if (table === 'courses') {
            return { data: MOCK_COURSES, error: null }
          }
          return { data: null, error: { message: "Table not found in mock data" } }
        }

        try {
          const cookieStore = await cookies()
          const client = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
              cookies: {
                getAll() {
                  return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                  try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                      cookieStore.set(name, value, options)
                    )
                  } catch {
                    // Ignore cookies sets from server components
                  }
                },
              },
            }
          )
          const result = await client.from(table).select(query)
          if (result.error) {
            console.warn("[Supabase Server Client] Query error, falling back to mock data:", result.error.message)
            if (table === 'courses') {
              return { data: MOCK_COURSES, error: null }
            }
          }
          return result
        } catch (e: any) {
          console.error("[Supabase Server Client] Connection failed, falling back to mock data:", e.message || e)
          if (table === 'courses') {
            return { data: MOCK_COURSES, error: null }
          }
          return { data: null, error: { message: e.message || String(e) } }
        }
      }
    }
  }
}
