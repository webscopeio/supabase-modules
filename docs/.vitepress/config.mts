import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Supabase Modules",
  description: "Why start from zero?",
  head: [
    ["link", { rel: "icon", href: "/logo.svg" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Why start from zero?",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://supabase-modules-docs.vercel.app/",
      },
    ],
    ["meta", { property: "og:image", content: "/home.png" }],
    [
      "meta",
      {
        property: "twitter:description",
        content: "Why start from zero?",
      },
    ],
    [
      "meta",
      {
        property: "twitter:url",
        content: "https://supabase-modules-docs.vercel.app/",
      },
    ],
    ["meta", { property: "twitter:image", content: "/home.png" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Demo",
        link: "https://github.com/iamhectorsosa/supabase-modules",
      },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Workspace", link: "/getting-started/workspace" },
          { text: "Setup", link: "/getting-started/setup" },
          { text: "Supabase Local", link: "/getting-started/supabase" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/iamhectorsosa" }],

    editLink: {
      pattern:
        "https://github.com/iamhectorsosa/supabase-modules/blob/main/docs/:path",
    },
  },
});
