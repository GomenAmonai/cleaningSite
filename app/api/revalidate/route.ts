import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * Sanity webhook handler — triggers ISR revalidation when content is published.
 *
 * Setup in Sanity → API → Webhooks:
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: publish
 *   Secret:  value of SANITY_WEBHOOK_SECRET env var
 *   Header:  x-sanity-webhook-secret: <secret>
 */
export async function POST(req: NextRequest) {
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    // If a secret is configured, require it on every request
    if (secret) {
        const incoming = req.headers.get("x-sanity-webhook-secret");
        if (incoming !== secret) {
            return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
        }
    }

    // Revalidate the home page (services, reviews, FAQ, etc.)
    revalidatePath("/");

    // Revalidate all service detail pages
    revalidatePath("/services/[slug]", "page");

    return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
