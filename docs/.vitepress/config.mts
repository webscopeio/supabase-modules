import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Supabase Modules",
  description: "Supabase Modules by Webscope.io",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
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
      pattern: "https://github.com/iamhectorsosa/supabase-modules/docs/:path",
    },
  },
});
