# Your Supabase Instance

Start with local development using Supabase CLI. We recommend working with a local Supabase instance to create safe migrations before pushing them to your cloud or hosted Supabase instance. Here's what you need to know:

## Get Docker

To work with a local Supabase Instance you need to run a database container with a running docker daemon. We recommend getting Docker. You can find instructions on [Get Docker](https://docs.docker.com/get-docker/)

## Environment variables

Before development, whether you are starting from an example or adding to an existing project, you need a `/supabase` directory for local development. This is where your Supabase project lives.

### Initialize or scaffold your Supabase project

You can chose whether you want to start with a new Supabase project or if you want to scaffold your Supabase project files:

::: code-group

```bash [Using pnpm scripts]
pnpm db:init
```

```bash [Using Supabase CLI]
supabase init
```

```bash [Using degit]
degit iamhectorsosa/supabase-modules/playground/supabase supabase
```

:::

From either of these you should have a `/supabase` directory in your project with at least `config.toml` and `seed.sql` files.

::: info
When you initialize a Supabase projecet. You do not need to generate VS Code settings for Deno.
:::

Once you've made sure you have a Supabase project. You can use the CLI to get the Supabase development stack started and get the information you need.


::: code-group

```bash [Using pnpm scripts]
pnpm db:start
```

```bash [Using Supabase CLI]
supabase start
```

:::

Once your Supabase Instance is running you should get the following response:

```bash
         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: <ANON_KEY>
service_role key: <SERVICE_ROLE_KEY>
```

From these you will need the `API URL` and the `anon key` for your environment variables.

## Stop your Supabase Instance

To save resources remember to stop your Supabase Instance once you are done working.

::: code-group

```bash [Using pnpm scripts]
pnpm db:stop
```

```bash [Using Supabase CLI]
supabase stop
```