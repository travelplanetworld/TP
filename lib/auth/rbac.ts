/**
 * Travel Planet — Role Based Access Control (RBAC)
 * Governing document: 01_MASTER_SYSTEM_INSTRUCTION.md, 07_ADMIN_OS.md, 14_SECURITY_COMPLIANCE.md
 * 
 * Super Admin Principal: Amal Babu
 */

export type Role =
  | 'SUPER_ADMIN'
  | 'OPERATIONS_MANAGER'
  | 'FINANCE_MANAGER'
  | 'CRM_AGENT'
  | 'VENDOR_ADMIN'
  | 'PARTNER_AGENT'
  | 'CONSUMER';

export type Permission =
  | 'all:manage'
  | 'booking:read'
  | 'booking:create'
  | 'booking:cancel'
  | 'booking:modify'
  | 'trip:manage'
  | 'refund:request'
  | 'refund:authorize'
  | 'pricing:view'
  | 'pricing:mutate'
  | 'vendor:manage'
  | 'settlement:manage'
  | 'connector:view'
  | 'connector:configure'
  | 'connector:trigger_sync'
  | 'finance:view_ledger'
  | 'finance:reconcile'
  | 'ai:chat'
  | 'ai:execute_low_risk'
  | 'ai:confirm_consequential';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: ['all:manage'],
  OPERATIONS_MANAGER: [
    'booking:read',
    'booking:create',
    'booking:cancel',
    'booking:modify',
    'trip:manage',
    'refund:request',
    'pricing:view',
    'ai:chat',
    'ai:execute_low_risk',
  ],
  FINANCE_MANAGER: [
    'booking:read',
    'refund:request',
    'refund:authorize',
    'pricing:view',
    'pricing:mutate',
    'settlement:manage',
    'finance:view_ledger',
    'finance:reconcile',
    'ai:chat',
    'ai:execute_low_risk',
  ],
  CRM_AGENT: [
    'booking:read',
    'booking:create',
    'trip:manage',
    'refund:request',
    'ai:chat',
    'ai:execute_low_risk',
  ],
  VENDOR_ADMIN: [
    'booking:read',
    'pricing:view',
    'pricing:mutate',
    'vendor:manage',
    'settlement:manage',
  ],
  PARTNER_AGENT: [
    'booking:read',
    'booking:create',
    'pricing:view',
  ],
  CONSUMER: [
    'booking:read',
    'booking:create',
    'trip:manage',
    'refund:request',
  ],
};

export interface AuthContext {
  userId: string;
  email: string;
  fullName: string;
  role: Role;
  organizationId?: string;
  isSuperAdmin: boolean;
}

export const SUPER_ADMIN_PRINCIPAL: AuthContext = {
  userId: 'usr_super_admin_amal',
  email: 'amal.babu@travelplanet.com',
  fullName: 'Amal Babu',
  role: 'SUPER_ADMIN',
  organizationId: 'org_tp_hq',
  isSuperAdmin: true,
};

export function hasPermission(role: Role, permission: Permission): boolean {
  if (role === 'SUPER_ADMIN') return true;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission) || permissions.includes('all:manage');
}

export function authorizeAction(context: AuthContext, permission: Permission): void {
  if (!hasPermission(context.role, permission)) {
    throw new Error(`Unauthorized: User ${context.email} (${context.role}) lacks permission ${permission}`);
  }
}

export class RbacService {
  private static instance: RbacService;

  private constructor() {}

  public static getInstance(): RbacService {
    if (!RbacService.instance) {
      RbacService.instance = new RbacService();
    }
    return RbacService.instance;
  }

  public hasPermission(role: string, permission: string): boolean {
    return hasPermission(role as Role, permission as Permission);
  }

  public authorizeAction(context: AuthContext, permission: Permission): void {
    authorizeAction(context, permission);
  }
}
