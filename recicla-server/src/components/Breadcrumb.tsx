import {
  Breadcrumb as SystemBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type CrumbItem = {
  label: string; // e.g., Python
  href: string; // e.g., /development/programming-languages/python
};
interface IBreadcrumbProps {
};

function useRouteBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<CrumbItem[]>();
  const router = useRouter()
 
  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath, router.pathname]);

  return { breadcrumbs }
}

export const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = () => {
  const { breadcrumbs } = useRouteBreadcrumbs()

  const listItems = breadcrumbs && breadcrumbs.map((breadcrumb, i) =>
    <BreadcrumbItem key={breadcrumb.href}>
      <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
    </BreadcrumbItem>
  );

  return  (
    <SystemBreadcrumb>
      {listItems}
    </SystemBreadcrumb>
  );
};