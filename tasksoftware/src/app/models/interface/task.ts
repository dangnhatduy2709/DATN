export interface Task {
  taskID: number;
  projectID: number;
  taskType: string;
  summary: string;
  userID: number;
  status: number;
  createdDate: string;
  endDate: string;
  priority: number;
  description: string;
  projectName: string;
  fullName: string;
}

export interface ResponseDataTask {
  data: Task[];
}
