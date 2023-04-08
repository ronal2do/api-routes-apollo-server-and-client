'use client'

import { HomeIcon } from '@heroicons/react/20/solid';
import { useRouter, usePathname  } from 'next/navigation';
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
  const pathname = usePathname();

  console.log('pathname', pathname)
  useEffect(() => {
    const pathWithoutQuery = pathname?.split("?")[0];
    let pathArray = pathWithoutQuery?.split("/");
    pathArray?.shift();

    pathArray = pathArray?.filter((path) => path !== "");

    const breadcrumbs = pathArray?.map((path, index) => {
      const href = "/" + pathArray?.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [pathname ]);

  return { breadcrumbs }
}

export const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = () => {
  const { breadcrumbs } = useRouteBreadcrumbs()

  // const listItems = breadcrumbs && breadcrumbs.map((breadcrumb, i) =>
  //   // <BreadcrumbItem key={breadcrumb.href}>
  //   //   <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
  //   // </BreadcrumbItem>
    const listItems = breadcrumbs && breadcrumbs.map((breadcrumb, i) => (
      <li key={i}>
        <div className="flex items-center">
          <svg
            className="h-5 w-5 flex-shrink-0 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <a
            href={breadcrumb.href}
            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            // aria-current={breadcrumb.current ? 'page' : undefined}
          >
            {breadcrumb.label}
          </a>
        </div>
      </li>
    ))

  // return  (
  //   <SystemBreadcrumb>
  //     {listItems}
  //   </SystemBreadcrumb>
  // );
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {listItems}
      </ol>
    </nav>
  )
};