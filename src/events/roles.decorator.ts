import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to set roles metadata for route handlers.
 * @param roles Array of roles allowed to access the route.
 */
export const Roles = (...roles: string[]) => {
  console.log('Roles being set for route:', roles); // Debugging log
  return SetMetadata('roles', roles);
};
