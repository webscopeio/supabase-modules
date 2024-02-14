# Profile Module

## Installation

### Hooks

Make sure you work in a `/modules/profile` directory from the root repository.

::: code-group

```bash [Using degit]
cd modules
degit iamhectorsosa/supabase-modules/playground/modules/profile profile
```

<<< ../../playground/modules/profile/index.ts [index.ts]

:::

### Migration

Make sure you work in a `/supabase/migrations` directory from the root repository.

::: code-group

```bash [Using degit]
cd modules
degit iamhectorsosa/supabase-modules/playground/supabase/migrations

# degit will copy all migrations, delete the ones you do not need
# you only need `20240214100236_profile.sql` for this module
```

<<< ../../playground/supabase/migrations/20240214100236_profile.sql [20240214100236_profile.sql]

:::

## Usage

::: info
VIP
:::