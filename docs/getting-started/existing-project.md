# Add to Existing Project

Supabase Modules have been designed with Next in mind. So after setting up your Next application or in your existing Next application, here is what you will need:

::: warning Before proceeding
These instructions are based on a **Next 14 application**. More frameworks coming soon.
:::

## 1. Installing dependencies

```bash
pnpm add @tanstack/react-query @supabase/ssr @supabase/supabase-js
```

### Supabase CLI

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

## 2. Set environment variables

Update or create an `.env.local` file to store your environment variables.

```.env
NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPANASE_ANON_KEY>
```

> Note: Environment Variables required to connect your project with your Supabase project are determined by your local or cloud instance. Read more on [Your Supabase Instance](/getting-started/supabase).

## 3. Add Query and Middleware to your project

### TanStack Query

To use TanStack Query you need to set a `QueryClientProvider`. Typically you would add this to your list of providers or create a provider if you don't have one already.

You can run the command below where you want to create the `providers.tsx` file or use the code snippet to create your own.

::: code-group

```bash [Using degit]
degit iamhectorsosa/supabase-modules/playground/app/providers.tsx
```

<<< ../../playground/app/providers.tsx [Manual]

:::

### Middleware

Update or create a `middleware.ts` file at the root of your project. Since Server Components can't write cookies, you need middleware to refresh expired Auth tokens and store them.

You can run the command below where you want to create the `middleware.ts` file or use the code snippet to create your own.

::: code-group

```bash [Using degit]
degit iamhectorsosa/supabase-modules/playground/middleware.ts
```

<<< ../../playground/middleware.ts [Manual]

:::

## 4. Initialize or scaffold your Supabase project

You can chose whether you want to start with a new Supabase project or if you want to scaffold your Supabase project files:

### a. Initializing your Supabase project

```bash
supabase init
```

### b. Scaffolding your Supabase project

```bash
degit iamhectorsosa/supabase-modules/playground/supabase
```

## 5. Start your development server

::: warning TODO
Update the scripts from `package.json`
:::

```bash
pnpm dev
```

::: tip :tada: Congratulations!
You are done! See [All Modules](/modules/all) to install individual Modules.
:::

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
