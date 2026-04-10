type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

type Op = {
  method: Method;
  path: string;
  summary: string;
  tags: string[];
  /** When true, operation expects `Authorization: Bearer <JWT>`. */
  auth?: boolean;
};

const OPS: Op[] = [
  { method: 'get', path: '/api/health', summary: 'Service health check', tags: ['Health'] },

  { method: 'post', path: '/api/auth/login', summary: 'Sign in', tags: ['Auth'] },
  { method: 'post', path: '/api/auth/register', summary: 'Register user', tags: ['Auth'] },
  { method: 'post', path: '/api/auth/reset-password', summary: 'Request password reset', tags: ['Auth'] },
  { method: 'post', path: '/api/auth/update-password', summary: 'Update password', tags: ['Auth'] },
  { method: 'get', path: '/api/auth/me', summary: 'Current user (JWT)', tags: ['Auth'], auth: true },
  { method: 'get', path: '/api/auth/test-token', summary: 'JWT test helper (dev)', tags: ['Auth'] },

  { method: 'get', path: '/api/settings', summary: 'Site settings (domain or optional Bearer)', tags: ['Settings'] },
  { method: 'put', path: '/api/settings', summary: 'Update settings', tags: ['Settings'], auth: true },

  { method: 'get', path: '/api/portfolio-config', summary: 'Portfolio configuration', tags: ['Portfolio'] },

  { method: 'get', path: '/api/domains/config', summary: 'Domain config', tags: ['Domains'] },
  { method: 'get', path: '/api/domains/user', summary: 'Domains for user context', tags: ['Domains'] },

  { method: 'get', path: '/api/categories', summary: 'List categories', tags: ['Categories'] },
  { method: 'post', path: '/api/categories', summary: 'Create category', tags: ['Categories'], auth: true },
  { method: 'put', path: '/api/categories/{id}', summary: 'Update category', tags: ['Categories'], auth: true },
  { method: 'delete', path: '/api/categories/{id}', summary: 'Delete category', tags: ['Categories'], auth: true },

  { method: 'get', path: '/api/technologies', summary: 'List technologies', tags: ['Technologies'] },
  { method: 'post', path: '/api/technologies', summary: 'Create technology', tags: ['Technologies'], auth: true },
  { method: 'put', path: '/api/technologies/{id}', summary: 'Update technology', tags: ['Technologies'], auth: true },
  { method: 'delete', path: '/api/technologies/{id}', summary: 'Delete technology', tags: ['Technologies'], auth: true },

  { method: 'get', path: '/api/skills', summary: 'List skills', tags: ['Skills'] },
  { method: 'post', path: '/api/skills', summary: 'Create skill', tags: ['Skills'], auth: true },
  { method: 'put', path: '/api/skills/{id}', summary: 'Update skill', tags: ['Skills'], auth: true },
  { method: 'delete', path: '/api/skills/{id}', summary: 'Delete skill', tags: ['Skills'], auth: true },

  { method: 'get', path: '/api/niches', summary: 'List niches', tags: ['Niches'] },
  { method: 'post', path: '/api/niches', summary: 'Create niche', tags: ['Niches'], auth: true },
  { method: 'put', path: '/api/niches/{id}', summary: 'Update niche', tags: ['Niches'], auth: true },
  { method: 'delete', path: '/api/niches/{id}', summary: 'Delete niche', tags: ['Niches'], auth: true },

  { method: 'get', path: '/api/menus', summary: 'List menus', tags: ['Menus'] },
  { method: 'post', path: '/api/menus', summary: 'Create menu', tags: ['Menus'], auth: true },
  { method: 'get', path: '/api/menus/sections', summary: 'Menus by sections', tags: ['Menus'] },
  { method: 'post', path: '/api/menus/reorder', summary: 'Reorder menus', tags: ['Menus'], auth: true },
  { method: 'put', path: '/api/menus/{id}', summary: 'Update menu', tags: ['Menus'], auth: true },
  { method: 'delete', path: '/api/menus/{id}', summary: 'Delete menu', tags: ['Menus'], auth: true },

  { method: 'get', path: '/api/projects', summary: 'List projects', tags: ['Projects'] },
  { method: 'post', path: '/api/projects', summary: 'Create project', tags: ['Projects'], auth: true },
  { method: 'get', path: '/api/projects/{id}', summary: 'Get project', tags: ['Projects'], auth: true },
  { method: 'put', path: '/api/projects/{id}', summary: 'Update project', tags: ['Projects'], auth: true },
  { method: 'delete', path: '/api/projects/{id}', summary: 'Delete project', tags: ['Projects'], auth: true },
  { method: 'get', path: '/api/projects/{id}/images', summary: 'List project images', tags: ['Projects'] },
  { method: 'post', path: '/api/projects/{id}/images', summary: 'Add project image', tags: ['Projects'], auth: true },
  { method: 'delete', path: '/api/projects/{id}/images', summary: 'Remove project image(s)', tags: ['Projects'], auth: true },

  { method: 'get', path: '/api/gallery', summary: 'Gallery data', tags: ['Gallery'] },

  { method: 'get', path: '/api/dynamic-sections', summary: 'List dynamic sections', tags: ['Dynamic sections'] },
  { method: 'post', path: '/api/dynamic-sections', summary: 'Create dynamic section', tags: ['Dynamic sections'] },
  { method: 'put', path: '/api/dynamic-sections', summary: 'Update dynamic section', tags: ['Dynamic sections'] },
  { method: 'delete', path: '/api/dynamic-sections', summary: 'Delete dynamic section', tags: ['Dynamic sections'] },
  { method: 'post', path: '/api/dynamic-sections/reorder', summary: 'Reorder sections', tags: ['Dynamic sections'], auth: true },
  { method: 'get', path: '/api/dynamic-sections/positioning', summary: 'Section positioning', tags: ['Dynamic sections'] },

  { method: 'get', path: '/api/contact-queries', summary: 'List contact queries', tags: ['Contact'] },
  { method: 'post', path: '/api/contact-queries', summary: 'Create contact / onboarding entry', tags: ['Contact'], auth: true },
  { method: 'put', path: '/api/contact-queries/{id}', summary: 'Update contact query', tags: ['Contact'], auth: true },
  { method: 'delete', path: '/api/contact-queries/{id}', summary: 'Delete contact query', tags: ['Contact'], auth: true },

  { method: 'get', path: '/api/storage/list', summary: 'List stored blobs for user', tags: ['Storage'], auth: true },
  { method: 'post', path: '/api/storage/upload', summary: 'Upload file (multipart: file, bucket)', tags: ['Storage'], auth: true },
  { method: 'delete', path: '/api/storage/delete', summary: 'Delete blob(s)', tags: ['Storage'], auth: true },

  { method: 'get', path: '/api/admin/sections', summary: 'Admin sections for user', tags: ['Admin'], auth: true },
  { method: 'post', path: '/api/admin/sections', summary: 'Create admin section', tags: ['Admin'], auth: true },
  { method: 'get', path: '/api/admin/sections/{sectionKey}/access', summary: 'Check section access', tags: ['Admin'], auth: true },
  { method: 'post', path: '/api/admin/fix-image-order', summary: 'Fix project image ordering', tags: ['Admin'] },
  { method: 'get', path: '/api/admin/check-images', summary: 'Diagnostics for project_images', tags: ['Admin'] },

  { method: 'get', path: '/api/theme-updates', summary: 'List theme updates', tags: ['Theme'] },
  { method: 'post', path: '/api/theme-updates', summary: 'Create theme update', tags: ['Theme'] },
  { method: 'put', path: '/api/theme-updates', summary: 'Update theme update', tags: ['Theme'] },
  { method: 'delete', path: '/api/theme-updates', summary: 'Delete theme update', tags: ['Theme'] },
  { method: 'post', path: '/api/theme/application-logs', summary: 'Log theme apply result (public)', tags: ['Theme'] },
  { method: 'get', path: '/api/theme/stats', summary: 'Theme stats', tags: ['Theme'] },
  { method: 'get', path: '/api/theme-update-logs', summary: 'Theme update logs', tags: ['Theme'], auth: true },
  { method: 'get', path: '/api/theme-clients', summary: 'List theme clients', tags: ['Theme'], auth: true },
  { method: 'post', path: '/api/theme-clients', summary: 'Register / heartbeat theme client', tags: ['Theme'] },
  { method: 'patch', path: '/api/theme-clients', summary: 'Patch theme client', tags: ['Theme'] },

  { method: 'get', path: '/api/dashboard/projects', summary: 'Dashboard projects', tags: ['Dashboard'], auth: true },

  { method: 'get', path: '/api/automatic-update/dashboard', summary: 'Automatic update dashboard', tags: ['Automatic update'], auth: true },
  { method: 'post', path: '/api/automatic-update-logs', summary: 'Create automatic-update log', tags: ['Automatic update'] },
  { method: 'get', path: '/api/automatic-update-logs', summary: 'List automatic-update logs', tags: ['Automatic update'] },

  { method: 'get', path: '/api/shared-hosting-clients', summary: 'List shared-hosting clients (admin)', tags: ['Shared hosting'], auth: true },
  { method: 'post', path: '/api/shared-hosting-clients', summary: 'Register shared-hosting client', tags: ['Shared hosting'] },
  { method: 'get', path: '/api/shared-hosting-updates', summary: 'List shared-hosting updates', tags: ['Shared hosting'] },
  { method: 'post', path: '/api/shared-hosting-updates', summary: 'Create shared-hosting update', tags: ['Shared hosting'], auth: true },
  { method: 'put', path: '/api/shared-hosting-updates', summary: 'Update shared-hosting update', tags: ['Shared hosting'], auth: true },
  { method: 'delete', path: '/api/shared-hosting-updates', summary: 'Delete shared-hosting update', tags: ['Shared hosting'], auth: true },

  { method: 'get', path: '/api/backup-files', summary: 'List backup files', tags: ['Backup'], auth: true },
  { method: 'post', path: '/api/backup-files', summary: 'Upload backup metadata / file', tags: ['Backup'], auth: true },
  { method: 'delete', path: '/api/backup-files', summary: 'Delete backup file(s)', tags: ['Backup'], auth: true },

  { method: 'get', path: '/api/supabase-test', summary: 'Supabase connectivity test', tags: ['Misc'] },
  { method: 'get', path: '/api/debug-domain', summary: 'Debug domain resolution', tags: ['Misc'] },
];

function buildPaths(): Record<string, Record<string, unknown>> {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const op of OPS) {
    if (!paths[op.path]) paths[op.path] = {};
    const operation: Record<string, unknown> = {
      tags: op.tags,
      summary: op.summary,
      responses: {
        '200': { description: 'Successful response' },
        default: { description: 'Error' },
      },
    };
    if (op.auth) {
      operation.security = [{ bearerAuth: [] }];
    }
    paths[op.path][op.method] = operation;
  }
  return paths;
}

const TAG_ORDER = [
  'Health',
  'Auth',
  'Settings',
  'Portfolio',
  'Domains',
  'Categories',
  'Technologies',
  'Skills',
  'Niches',
  'Menus',
  'Projects',
  'Gallery',
  'Dynamic sections',
  'Contact',
  'Storage',
  'Admin',
  'Theme',
  'Dashboard',
  'Automatic update',
  'Shared hosting',
  'Backup',
  'Misc',
];

export function getOpenApiDocument(serverUrl: string) {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description:
        'HTTP API for the portfolio backend. Authenticated routes use **Authorize** with a Bearer JWT (`Authorization: Bearer <token>`).',
    },
    servers: [{ url: serverUrl }],
    tags: TAG_ORDER.map((name) => ({ name })),
    paths: buildPaths(),
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  };
}
