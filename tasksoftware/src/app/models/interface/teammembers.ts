export interface TeamMembers {
  teamMemberID : number;
  teamID : number;
  userID: number;
  roleID: number;
  joinDate: string;
  create_at : string;
  updated_at: string;
}

export interface ResponseData {
  data: TeamMembers[];
}
