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
import { useFilePreview } from './FilePreviewContext';

export function ProjectBreadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const { preview, setPreview } = useFilePreview();
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

  let breadcrumbItems = pathSegments
    .map((segment, index) => {
      let href = '/' + pathSegments.slice(0, index + 1).join('/');
      const isLast = index === pathSegments.length - 1 && !preview;
      let label = segment === 'dashboard' 
        ? 'Dashboard' 
        : segment === 'project' 
        ? 'Project' 
        : segment === 'new'
        ? 'New Manuscript'
        : segment;
      
      // If this is the "project" segment and we have a project ID, link to the project page
      if (segment === 'project' && params?.id) {
        href = `/dashboard/project/${params.id}`;
      }
      
      // Replace project ID with project title if available
      if (segment === params?.id && projectTitle) {
        label = projectTitle;
        // Make sure the href points to the project page
        href = `/dashboard/project/${segment}`;
      }

      return { href, label, isLast, segment };
    })
    // Filter out project ID segment if title is still loading
    .filter((item) => {
      // Don't show the project ID segment if we're still loading the title
      if (item.segment === params?.id && !projectTitle) {
        return false;
      }
      return true;
    });

  // Add file name to breadcrumb if a file is selected
  if (preview && breadcrumbItems.length > 0) {
    breadcrumbItems = [
      ...breadcrumbItems.map(item => ({ ...item, isLast: false })),
      {
        href: '#',
        label: preview.name,
        isLast: true,
        segment: 'preview',
      },
    ];
  }

  const handleProjectClick = (e: React.MouseEvent, projectId?: string) => {
    e.preventDefault();
    setPreview(null);
    // Navigate to project page if we have a project ID
    if (projectId) {
      window.location.href = `/dashboard/project/${projectId}`;
    } else if (params?.id) {
      window.location.href = `/dashboard/project/${params.id}`;
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          // Check if this is the project title item (project ID segment) or the "Project" segment
          const isProjectTitle = item.segment === params?.id && projectTitle;
          const isProjectSegment = item.segment === 'project' && params?.id;
          
          // Use a unique key combining index and segment to avoid duplicates
          const uniqueKey = `${index}-${item.segment}-${item.href}`;
          
          return (
            <div key={uniqueKey} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (isProjectTitle || isProjectSegment) ? (
                  <BreadcrumbLink asChild>
                    <Link 
                      href={item.href}
                      onClick={(e) => handleProjectClick(e, isProjectTitle ? item.segment : undefined)}
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

