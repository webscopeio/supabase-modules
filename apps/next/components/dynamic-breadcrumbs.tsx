"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const DynamicBreadCrumbs: React.FC = () => {
  const pathname = usePathname();

  const paths = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    return segments.reduce<{ href: string; label: string }[]>(
      (acc, curr, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label =
          curr.charAt(0).toUpperCase() + curr.slice(1).replaceAll("-", " ");

        acc.push({ href, label });
        return acc;
      },
      [{ href: "/", label: "Home" }]
    );
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map(({ href, label }, index) => (
          <React.Fragment key={href}>
            {index !== paths.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <span className="text-foreground">{label}</span>
              </BreadcrumbItem>
            )}
            {index !== paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
