import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { indexingEnabled } from "@/lib/seo/indexing";

export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.baseUrl}/sitemap.xml`,
  };
}
