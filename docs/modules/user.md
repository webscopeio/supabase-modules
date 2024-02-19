# User Module

If you are starting from an example project - all types, utilities, and modules are installed by default. You can continue reviewing information about usage.

## Installation

::: code-group

```bash [Install all]
cd modules
degit iamhectorsosa/supabase-modules/apps/next/modules/user user
```

```bash [Only hooks]
cd modules
degit iamhectorsosa/supabase-modules/apps/next/modules/user/hooks user/hooks
```

```bash [Only components]
cd modules
degit iamhectorsosa/supabase-modules/apps/next/modules/user/ui user/ui
```

```bash [Only migrations]
cd modules
degit iamhectorsosa/supabase-modules/apps/next/modules/user/migrations user/migrations
```

:::

Then copy, paste and execute the contents of file `migration.sql` in your Supabase SQL Editor.

## Examples

### Creating a login page

<<< ../../apps/next/app/login/page.tsx

### Creating a register page

<<< ../../apps/next/app/register/page.tsx
