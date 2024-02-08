# Start from an Example

Jumpstart your development by cloning an Example project. This option is perfect if you're looking to explore what Supabase Modules can do in a fully functional app.

::: info About this example project
This example project is based on a **Next 14 application**. More example projects coming soon.
:::

## 1. Clone project and installing dependencies

Clone the repository using `degit` and then install the project's dependencies.

```bash [Using degit]
degit iamhectorsosa/supabase-modules/playground
```

```bash [Using degit]
cd playground
pnpm install
```

## 2. Set environment variables

Create an `.env.local` file to store your environment variables.

```.env
NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPANASE_ANON_KEY>
```

> Note: Environment Variables required to connect your project with your Supabase project are determined by your local or cloud instance. Read more on [Your Supabase Instance](/getting-started/supabase).

## 3. Start your development server.

```bash
pnpm dev
```

::: tip :tada: Congratulations!
You are done! See [All Modules](/modules/all) to install individual Modules.
:::