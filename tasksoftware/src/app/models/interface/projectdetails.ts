export interface ProjectDetails {
  projectID: number;
  projectDescription	: string;
  clientContactName	: string;
  clientContactEmail: string;
  clientContactPhone	: string;
  teamID: number;
  userID: number;
}
export interface ResponseData {
  data: ProjectDetails[];
}
