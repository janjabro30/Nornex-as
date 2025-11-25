// This page redirects to the main privacy policy page
// Using a separate Norwegian path for SEO and user experience

import { redirect } from "next/navigation";

export default function PersonvernPage() {
  redirect("/privacy-policy");
}
