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
        text: "Introduction",
        items: [
          { text: "Supabase Modules", link: "/introduction/modules" },
          { text: "Workspace", link: "/introduction/workspace" },
        ],
      },
      {
        text: "Getting Started",
        items: [
          { text: "Quickstart", link: "/getting-started/quickstart" },
          {
            text: "Start from an Example",
            link: "/getting-started/from-example",
          },
          {
            text: "Add to Existing Project",
            link: "/getting-started/existing-project",
          },
          { text: "Your Supabase Instance", link: "/getting-started/supabase" },
        ],
      },
      {
        text: "Modules",
        items: [
          { text: "All Modules", link: "/modules/all" },
          { text: "Auth", link: "/modules/auth" },
          { text: "Profile", link: "/modules/profile" },
          { text: "Avatar", link: "/modules/avatar" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/iamhectorsosa" }],

    editLink: {
      pattern:
        "https://github.com/iamhectorsosa/supabase-modules/blob/main/docs/:path",
    },
    search: {
      provider: "local",
    },
  },
});
