
export const OrderResponses: Record<"ORDER_NOT_FOUND" | "ORDER_CREATED"|"ORDER_FAILED", { statusCode: number, message: string }> = {
  ORDER_NOT_FOUND: {
    statusCode: 404,
    message: "ORDER NOT FOUND"
  },
ORDER_CREATED: {
    statusCode: 200,
    message: "ORDER CREATED"
  },
  ORDER_FAILED:{
    statusCode:400,
    message:"ORDER CREATION FAILED "
  }



}