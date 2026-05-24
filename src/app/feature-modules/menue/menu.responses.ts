
export const MenuResponses: Record<"MENU_NOT_FOUND" | "MENU_ADDED"|"MENU_CREATION_FAILED", { statusCode: number, message: string }> = {
  MENU_NOT_FOUND: {
    statusCode: 404,
    message: "MENU NOT FOUND"
  },
MENU_ADDED: {
    statusCode: 200,
    message: "MENU CREATED"
  },
  MENU_CREATION_FAILED:{
    statusCode:400,
    message:"MENU CREATION FAILED "
  }

}