export interface TaskDetails {
  taskID : number;
  taskDescription: string;
  actualHoursSpent: number;
  taskManagerID: number;
  create_at: string;
  updated_at: string;
}

export interface ResponseData {
  data: TaskDetails[];
}
