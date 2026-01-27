import type { MetadataRoute } from "next";
import { BOOKS } from "@/lib/bible";

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = "https://bible-reader-eight.vercel.app";


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
