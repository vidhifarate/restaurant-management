import { Permissions } from "../feature-modules/permissions/permission.schemas.js";
import { RolePermissions } from "../feature-modules/roles/junctionTable.schemas.js";
import { Roles } from "../feature-modules/roles/roles.schema.js";

export const seedRBAC = async () => {
  // 1. Seed Fine-Grained Permissions
  const createStaff = await Permissions.findOrCreate({ where: { action: "create:staff" } });
  const viewMenu = await Permissions.findOrCreate({ where: { action: "view:menu"} });
  const updateOrders = await Permissions.findOrCreate({ where: { action: "update:orders" } });

  // 2. Seed Dynamic Roles
  const [managerRole] = await Roles.findOrCreate({ where: { role: "manager" } });
  const [serviceRole] = await Roles.findOrCreate({ where: { role: "serviceStaff" } });

  // 3. Map Permissions to Roles inside the Join Table
  await RolePermissions.findOrCreate({ where: { role_id: managerRole.id, permission_id: createStaff[0].id } });
  await RolePermissions.findOrCreate({ where: { role_id: managerRole.id, permission_id: viewMenu[0].id } });
  await RolePermissions.findOrCreate({ where: { role_id: serviceRole.id, permission_id: viewMenu[0].id } });
  await RolePermissions.findOrCreate({ where: { role_id: serviceRole.id, permission_id: updateOrders[0].id } });

  console.log("🌱 RBAC base configurations seeded successfully.");
};