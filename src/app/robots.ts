import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Allow all public pages for every bot
                userAgent: "*",
                allow: "/",
                // Block the entire admin section from indexing
                disallow: "/admin/",
            },
        ],
        sitemap: "https://www.emberandoak.com/sitemap.xml",
    };
}
