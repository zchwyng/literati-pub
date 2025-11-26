'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = React.useMemo(() => {
    const items = [];
    // Always start with Dashboard? 
    // pathname starts with /dashboard usually
    
    let currentPath = '';
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'dashboard') label = 'Dashboard';
      if (segment === 'project') label = 'Project';
      if (segment === 'new') label = 'New Manuscript';
      
      // If it's an ID (usually long/numeric), maybe truncate or generic?
      // Assuming standard UUID or ID length > 10
      if (segment.length > 10 && i > 0 && segments[i-1] === 'project') {
         label = 'Workspace'; 
      }

      items.push({
        href: currentPath,
        label,
        isLast: i === segments.length - 1
      });
    }
    return items;
  }, [segments]);

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}


