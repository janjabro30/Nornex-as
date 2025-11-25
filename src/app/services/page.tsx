// This page redirects to the Norwegian services page (tjenester)
// Using a separate English path for SEO and user experience

import { redirect } from "next/navigation";

export default function ServicesRedirectPage() {
  redirect("/tjenester");
}
