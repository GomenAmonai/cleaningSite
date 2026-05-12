import { client } from "./client";

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
    try {
        return await client.fetch<T>(query, params, {
            next: { revalidate: 60 },
        });
    } catch (err) {
        console.error("[sanityFetch] failed:", err);
        return null;
    }
}
