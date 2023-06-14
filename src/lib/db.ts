import { PrismaClient } from "@prisma/client";

// # Unused
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )


// # Unused


// Singleton Pattern
// like a static variable
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// Check if static already has prisma client
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['error', 'query', 'info', 'warn'],
    log: ['query', 'error', 'info', 'warn'],
    errorFormat: 'minimal'
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

