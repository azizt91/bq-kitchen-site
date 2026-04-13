import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Next.js Draft Mode — Deactivation Route
 * Allows the user to exit preview mode.
 */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
