
export const UserResponses: Record<"USER_NOT_FOUND" | "USER_CREATED"|"USER_CREATION_FAILED", { statusCode: number, message: string }> = {
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "USER NOT FOUND"
  },
USER_CREATED: {
    statusCode: 200,
    message: "USER CREATED"
  },
  USER_CREATION_FAILED:{
    statusCode:400,
    message:"USER CREATION FAILED "
  }
}