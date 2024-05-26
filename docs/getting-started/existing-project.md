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

You will also need to update your `package.json` scripts to use Supabase CLI:

```json
"scripts": {
  "db:init": "supabase init", // [!code ++]
  "db:start": "supabase start", // [!code ++]
  "db:stop": "supabase stop", // [!code ++]
  "db:reset": "supabase db reset", // [!code ++]
  "db:gen-types": "supabase gen types typescript --local > modules/types/index.ts" // [!code ++]
}
```

## 2. Initialize or scaffold your Supabase project

You can chose whether you want to start with a new Supabase project or if you want to scaffold your Supabase project files:

::: code-group

```bash [Using pnpm scripts]
pnpm db:init
```

```bash [Using Supabase CLI]
supabase init
```

```bash [Using degit]
degit webscopeio/supabase-modules/apps/next/supabase supabase
```

:::

From either of these you should have a `/supabase` directory in your project with at least `config.toml` and `seed.sql` files.

::: info
When you initialize a Supabase projecet. You do not need to generate VS Code settings for Deno.
:::

## 3. Set environment variables

Update or create an `.env.local` file to store your environment variables.

<<< ../../.env.example

The `.env.example` file above contains the environment variables that you can use for local development.

To generate these environment variables you have to run Supabase locally first before development. Read more on [Your Supabase Instance](/getting-started/supabase).

## 4. Add Query and API Route Handler to your project

### TanStack Query

To use TanStack Query you need to set a `QueryClientProvider`. Typically you would add this to your list of providers or create a provider if you don't have one already.

<<< ../../apps/next/app/providers.tsx

This provider has to be included in the project code. In a Next 13 application this would be in the main`layout.tsx` file. For more, see [TanStack Query Next.js app with streaming](https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-suspense-streaming).

### API Route Handler

Chances are that you will need this route handler.

<<< ../../apps/next/app/auth/confirm/route.ts

## 5. Start your development server

::: warning Before proceeding
To work with a local Supabase Instance you need to run a database container with a running docker daemon. We recommend getting Docker. You can find instructions on [Get Docker](https://docs.docker.com/get-docker/)
:::

::: code-group

```bash [Using a local Supabase Instance]
pnpm db:start & pnpm dev
```

```bash [Using a cloud Supabase Instance]
pnpm dev
```

:::

::: tip :tada: Congratulations!
You are done! See [Installation](/modules/installation) to install individual Modules. Remember to run `pnpm db:stop` to save resources once you are done working with your local Supabase Instance.
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
pnpm add -D eslint eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-tailwindcss
```

2. Then configure your `eslintc.json`

<<< ../../apps/next/.eslintrc.json

:::
