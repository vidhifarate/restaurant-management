
export const RoleResponses: Record<"ROLE_NOT_FOUND" | "ROLE_CREATED"|"ROLE_CREATION_FAILED", { statusCode: number, message: string }> = {
  ROLE_NOT_FOUND: {
    statusCode: 404,
    message: "ROLE NOT FOUND"
  },
ROLE_CREATED: {
    statusCode: 200,
    message: "ROLE CREATED"
  },
  ROLE_CREATION_FAILED:{
    statusCode:400,
    message:"ROLE CREATION FAILED "
  }
}