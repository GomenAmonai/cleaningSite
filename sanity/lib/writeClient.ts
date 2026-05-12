import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only Sanity client with write permissions.
 * Requires SANITY_API_WRITE_TOKEN. Returns null if the token is missing
 * so callers can fall back gracefully (e.g. log + continue).
 */
export function getWriteClient() {
    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
        return null;
    }
    return createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token,
        perspective: "published",
    });
}
