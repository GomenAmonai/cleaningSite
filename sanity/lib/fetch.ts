import { client } from "./client";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-side read client. Uses SANITY_API_WRITE_TOKEN when present so that
 * private/restricted Sanity projects can still be queried from Server Components.
 * The token is never exposed to the browser — this module is server-only.
 *
 * Falls back to the public client when the token is absent (e.g. static export,
 * fully public dataset).
 */
function getReadClient() {
    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) return client;
    return createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token,
        perspective: "published",
    });
}

const readClient = getReadClient();

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
    try {
        return await readClient.fetch<T>(query, params, {
            next: { revalidate: 60 },
            signal: AbortSignal.timeout(8000),
        });
    } catch (err) {
        console.error("[sanityFetch] failed:", err);
        return null;
    }
}
