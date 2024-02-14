# Installation

If you are starting from an example project - all types, utilities, and modules are installed by default. You can continue reviewing individual modules for more information about usage.

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
degit iamhectorsosa/supabase-modules/playground/modules/types types
```

:::

## Module Utilities

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to add some database utils.

Make sure you work in a `/modules` directory from the root repository.

::: code-group

```bash [Using degit]
cd modules
degit iamhectorsosa/supabase-modules/playground/modules/utils utils
```

<<< ../../playground/modules/utils/cache.ts [cache.ts]

<<< ../../playground/modules/utils/supabase-client.ts [supabase-client.ts]

<<< ../../playground/modules/utils/supabase-server.ts [supabase-server.ts]

:::

## List of Modules

Find all the modules you need for your Supabase project here. Quick to integrate, ready to use.

| Modules                         | Dependencies |
| ------------------------------- | :----------: |
| [Authentication](/modules/auth) |      -       |
| [Profile](/modules/profile)     |    `auth`    |
