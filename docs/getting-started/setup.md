# Setting up

Supabase Modules have been designed with Next in mind. So after setting up your Next application or in your existing Next application, here is what you will need:

## Installing Dependencies

```bash
pnpm add @tanstack/react-query @supabase/ssr @supabase/supabase-js
```

## Supabase CLI

To run the entire Supabase Stack locally on your machine, you will have to decide whether you want to add the Supabase CLI as a dev dependency, execute it using your package manager or install it globally using [Homebrew](https://brew.sh/)

::: code-group

```bash [pnpm as -D]
pnpm add -D supabase
```

```bash [pnpm dlx]
pnpm dlx supabase <command>
```

```bash [Homebrew]
brew install supabase/tap/supabase
```

:::

Learn more about [Supabase CLI](https://supabase.com/docs/reference/cli/introduction)

## Get Docker

To work with a local Supabase Instance you need to run a database container with a running docker daemon. We recommend getting Docker. You can find instructions on [Get Docker](https://docs.docker.com/get-docker/)

## Recommendations

It is recommended to also use TanStack's [ESLint Plugin Query](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query) to help you catch bugs and inconsistencies while you code.

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

Make sure to read their [Usage Instructions](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query#usage) for setup.

::: details ESLint Configuration Example
Here is an example of a simple setup for a Next TypeScript React project:

1. First install the dev dependencies (here we're included all of the dependencies for the config):

```bash
pnpm add -D @tanstack/eslint-plugin-query @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-next eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

2. Then configure your `eslintc.json`

```bash {9,15,16,17}
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:react/recommended", // [!code ++]
    "plugin:react-hooks/recommended", // [!code ++]
    "plugin:@tanstack/eslint-plugin-query/recommended" // [!code ++]
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["import", "@typescript-eslint"],
  "root": true,
  "rules": {
    "@tanstack/query/exhaustive-deps": "error", // [!code ++]
    "@tanstack/query/no-rest-destructuring": "warn", // [!code ++]
    "@tanstack/query/stable-query-client": "error", // [!code ++]
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}

```
:::