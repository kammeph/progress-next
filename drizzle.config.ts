import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/drizzle/schema/*',
  out: './drizzle',
  breakpoints: true
} satisfies Config;
