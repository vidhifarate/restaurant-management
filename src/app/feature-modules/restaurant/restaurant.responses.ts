
export const RestaurantResponses: Record<"RESTAURANT_NOT_FOUND" | "RESTAURANT_CREATED"|"RESTAURANT_CREATION_FAILED", { statusCode: number, message: string }> = {
  RESTAURANT_NOT_FOUND: {
    statusCode: 404,
    message: "RESTAURANT NOT FOUND"
  },
RESTAURANT_CREATED: {
    statusCode: 200,
    message: "RESTAURANT CREATED"
  },
  RESTAURANT_CREATION_FAILED:{
    statusCode:400,
    message:"RESTAURANT CREATION FAILED "
  }
}