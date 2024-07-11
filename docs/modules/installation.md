# Installation

If you are starting from an example project - all types, utilities, and modules are installed by default. Therefore, you can continue reviewing individual modules for more information about usage.

## Database TypeScript types

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to generate the database's TypeScript types.

Make sure you work in a `/database` directory from the root repository.

::: code-group

```bash [Using pnpm scripts]
pnpm db:gen-types
```

```bash [Using Supabase CLI]
supabase gen types typescript --local > database/types/supabase.ts
```

```bash [Using degit]
cd modules
degit webscopeio/supabase-modules/apps/next/database/types types
```

:::

## Module utilities

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to add some database utils.

Make sure you work in a `/database` directory from the root repository.

::: code-group

```bash [Using degit]
cd modules
degit webscopeio/supabase-modules/apps/next/database/client client
```

<<< ../../apps/next/database/client/client.ts [client.ts]

<<< ../../apps/next/database/client/server.ts [server.ts]

:::

## List of modules

Find all the modules you need for your Supabase project here. Quick to integrate, ready to use.

| Modules               | Dependencies |
| --------------------- | :----------: |
| [User](/modules/user) |      -       |
