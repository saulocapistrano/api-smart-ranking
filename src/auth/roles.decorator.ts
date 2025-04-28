import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const RolesGuard = () => {
  return (req, res, next) => {
    const roles = req.user.roles;
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, req.route.path);
    if (!requiredRoles || requiredRoles.some((role) => roles.includes(role))) {
      return next();
    }
    return res.status(403).send('Forbidden');
  };
};
