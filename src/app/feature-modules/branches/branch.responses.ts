
export const BranchResponses: Record<"BRANCH_NOT_FOUND" | "BRANCH_CREATED"|"BRANCH_CREATION_FAILED"|"DELETED_A_BRANCH" ,{ statusCode: number, message: string }> = {
  BRANCH_NOT_FOUND: {
    statusCode: 404,
    message: "BRANCH NOT FOUND"
  },
BRANCH_CREATED: {
    statusCode: 200,
    message: "BRANCH CREATED"
  },
  BRANCH_CREATION_FAILED:{
    statusCode:400,
    message:"BRANCH CREATION FAILED "
  },
  DELETED_A_BRANCH:{
    statusCode:500,
    message:"DELETE A BRANCH"
  }
}