import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Playground",
    short_name: "The Playground",
    description: "The Playground",
    start_url: "/",
    display: "fullscreen",
    background_color: "#E0E0E0",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
