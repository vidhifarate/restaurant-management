
export const AuthResponses: Record<"USER_NOT_FOUND" | "INVALID_CREDENTIALS" | "USER_ALREADY_EXISTS", { statusCode: number, message: string }> = {
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "USER NOT FOUND"
  },
  INVALID_CREDENTIALS: {
    statusCode: 400,
    message: "INVALID CREDENTIALS"
  },
  USER_ALREADY_EXISTS: {
    statusCode: 400,
    message: "USER ALREADY EXISTS"
  }

}