export interface Project {
  projectID: number;
  projectName: string;
  projectKey: string;
  progress: number;
  createdDate: string;
  endDate: string;
  projectDescription: string;
  clientContactName: string;
  clientContactEmail: string;
  clientContactPhone: string;
  teamID: number;
  userID: number;
  leadFullName: string,
  imgUser: string,
  teamFullName: string
}
export interface ResponseDataProject {
  data: Project[];
}
