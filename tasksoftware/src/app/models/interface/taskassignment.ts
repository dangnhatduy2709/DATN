export interface TaskAssignments {
  taskAssignmentID: number;
  taskID : number;
  assigneeID: number;
  hoursSpent: number;
  completionDate : string;
  note: string;
  status: string;
  create_at : string;
  updated_at: string;
}

export interface ResponseData {
  data: TaskAssignments[];
}
