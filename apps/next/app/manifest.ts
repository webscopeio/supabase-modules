import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Playground",
    short_name: "The Playground",
    description: "The Playground",
    start_url: "/",
    display: "fullscreen",
    background_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
