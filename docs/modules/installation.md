# Installation

If you are starting from an example project - all types, utilities, and modules are installed by default. Therefore, you can continue reviewing individual modules for more information about usage.

## Database TypeScript types

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to generate the database's TypeScript types.

Make sure you work in a `/modules` directory from the root repository.

::: code-group

```bash [Using pnpm scripts]
pnpm db:gen-types
```

```bash [Using Supabase CLI]
supabase gen types typescript --local > modules/types/index.ts
```

```bash [Using degit]
cd modules
degit webscopeio/supabase-modules/apps/next/modules/types types
```

:::

## Module utilities

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to add some database utils.

Make sure you work in a `/modules` directory from the root repository.

::: code-group

```bash [Using degit]
cd modules
degit webscopeio/supabase-modules/apps/next/modules/utils utils
```

<<< ../../apps/next/modules/utils/client.ts [client.ts]

<<< ../../apps/next/modules/utils/server.ts [server.ts]

:::

## List of modules

Find all the modules you need for your Supabase project here. Quick to integrate, ready to use.

| Modules               | Dependencies |
| --------------------- | :----------: |
| [User](/modules/user) |      -       |
