interface Team {
  teamID: number;
  teamName: string;
  createdDate: string;
}

interface MemberData {
  teamMemberID: number;
  userID: number;
  fullName: string;
  roleID: number;
  joinDate: string;
}

export interface TeamData {
  data: Team[];
}
