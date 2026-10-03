import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saathi — practice phone apps safely",
    short_name: "Saathi",
    description: "Practice everyday apps with a patient AI companion. Nothing here is real, so nothing can go wrong.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbeb",
    theme_color: "#15803d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
