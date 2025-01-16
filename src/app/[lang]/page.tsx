import { auth } from "~/server/auth";
import { getDictionary, type LangParam } from "~/server/i18n";
import { HydrateClient } from "~/trpc/server";

export default async function Home({ params }: { params: LangParam }) {
  const session = await auth();
  const { lang } = await params;
  const dict = await getDictionary(lang);

  if (session?.user) {
  }

  return (
    <HydrateClient>
      <main></main>
    </HydrateClient>
  );
}
