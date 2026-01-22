import type { MetadataRoute } from "next";
import { BOOKS } from "@/lib/bible";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/search`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const bookRoutes: MetadataRoute.Sitemap = BOOKS.map((b) => ({
    url: `${baseUrl}/book/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...bookRoutes];
}
