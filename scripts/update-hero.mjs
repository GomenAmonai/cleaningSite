#!/usr/bin/env node
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2026-05-09",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

console.log("Uploading hero.png…");
const buffer = await readFile("/tmp/hero.jpg");
const asset = await client.assets.upload("image", buffer, { filename: "hero.jpg" });
console.log(`✓ Uploaded: ${asset._id}`);

console.log("Patching siteSettings.heroImage…");
await client
    .patch("siteSettings")
    .set({
        heroImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
        },
    })
    .commit();
console.log("✓ Done. Hero will appear on prod in ~60s.");
