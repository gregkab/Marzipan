import type { MetadataRoute } from "next";
import { getPolicySlugs } from "@/lib/policies";
import { getProductHandles } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/shop", "/our-story", "/occasions", "/custom-orders"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const products = getProductHandles().map((handle) => ({
    url: `${site.url}/products/${handle}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const policies = getPolicySlugs().map((slug) => ({
    url: `${site.url}/policies/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...pages, ...products, ...policies];
}
