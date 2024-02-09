# Installation

## Database TypeScript types

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to generate the database's TypeScript types. If you are starting from an example project but at any point you update your database, you might have to run this command as well.

::: code-group

```bash [Using pnpm scripts]
pnpm db:gen-types
```

```bash [Using Supabase CLI]
supabase gen types typescript --local > modules/types/index.ts
```

```bash [Using degit]
degit iamhectorsosa/supabase-modules/modules/types
```

:::

## Module Utilities

If you are adding Supabase Modules to an existing project. Before installing any modules, you will need to add some database utils. If you are starting from an example project, these have already been added.

These should be in `/modules/utils`:

::: code-group

```bash [Using degit]
degit iamhectorsosa/supabase-modules/modules/utils
```

<<< ../../playground/modules/utils/supabase-client.ts [supabase-client.ts]

<<< ../../playground/modules/utils/supabase-server.ts [supabase-server.ts]

:::

## List of Modules

Find all the modules you need for your Supabase project here. Quick to integrate, ready to use.

| Modules                         |  Dependencies   |
| ------------------------------- | :-------------: |
| [Authentication](/modules/auth) |        -        |
| [Avatar](/modules/avatar)       |        -        |
| [Profile](/modules/profile)     | `auth` `avatar` |
