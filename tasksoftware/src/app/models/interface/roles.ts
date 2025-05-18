export interface Role {
  roleID: number;
  roleName: string;
  create_at: string;
  updated_at: string;
}

export interface ResponseData {
  data: Role[];
}
