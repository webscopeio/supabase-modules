# Start from an Example

Jumpstart your development by cloning an Example project. This option is perfect if you're looking to explore what Supabase Modules can do in a fully functional app.

::: info About this example project
This example project is based on a **Next 14 application**. More example projects coming soon.
:::

## 1. Clone project and installing dependencies

Clone the repository using `gh` CLI and then install the project's dependencies.

```bash
degit webscopeio/supabase-modules/apps/next my-app
```

```bash
cd supabase-modules
pnpm install
git init
```

## 2. Set environment variables

Create an `.env` file to store your environment variables. The environment variables below are safe to share and use for local development.

<<< ../../.env.example

To generate these environment variables you have to run Supabase locally first before development. Read more on [Your Supabase Instance](/getting-started/supabase).

## 3. Start your development server.

::: warning Before proceeding
To work with a local Supabase Instance you need to run a database container with a running docker daemon. We recommend getting Docker. You can find instructions on [Get Docker](https://docs.docker.com/get-docker/)
:::

::: code-group

```bash [Using a local Supabase Instance]
pnpm db:start && pnpm dev
```

```bash [Using a cloud Supabase Instance]
pnpm dev
```

:::

If you are working with the Supabase Modules Workspace please refer to [Workspace](/introduction/workspace).

::: tip :tada: Congratulations!
You are done! See [Installation](/modules/installation) for more information about the Modules. Remember that all modules are installed by default in this example.

Remember to run `pnpm db:stop` to save resources once you are done working with your local Supabase Instance.
:::
