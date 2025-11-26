'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getProject } from '../actions';

export function ProjectBreadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const [projectTitle, setProjectTitle] = React.useState<string | null>(null);

  // Fetch project title if on a project page
  React.useEffect(() => {
    const projectId = params?.id as string;
    if (projectId && pathname?.startsWith('/dashboard/project/')) {
      getProject(projectId).then((project) => {
        if (project) {
          setProjectTitle(project.title);
        }
      });
    }
  }, [params?.id, pathname]);

  // Parse the pathname to create breadcrumb items
  const pathSegments = pathname?.split('/').filter(Boolean) || [];
  
  // Don't show breadcrumb on dashboard home
  if (pathname === '/dashboard') {
    return null;
  }

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    let label = segment === 'dashboard' 
      ? 'Dashboard' 
      : segment === 'project' 
      ? 'Project' 
      : segment === 'new'
      ? 'New Manuscript'
      : segment;
    
    // Replace project ID with project title if available
    if (segment === params?.id && projectTitle) {
      label = projectTitle;
    }

    return { href, label, isLast };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

