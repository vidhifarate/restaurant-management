
export const TableResponses: Record<"TABLE_NOT_FOUND" | "TABLE_CREATED"|"TABLE_CREATION_FAILED", { statusCode: number, message: string }> = {
  TABLE_NOT_FOUND: {
    statusCode: 404,
    message: "TABLE NOT FOUND"
  },
TABLE_CREATED: {
    statusCode: 200,
    message: "TABLE CREATED"
  },
  TABLE_CREATION_FAILED:{
    statusCode:400,
    message:"TABLE CREATION FAILED "
  }

}