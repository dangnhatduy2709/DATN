export interface ProjectDetails {
  projectID: number;
  teamID: number;
  userID: number;
  create_at: string;
  updated_at	: string;
}
export interface ResponseData {
  data: ProjectDetails[];
}
