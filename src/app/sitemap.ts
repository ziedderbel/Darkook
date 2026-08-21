import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/destinations", "/experiences", "/about", "/contact"];

  return routes.flatMap((route) =>
    site.locales.map((locale) => ({
      url: `${site.baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );
}
