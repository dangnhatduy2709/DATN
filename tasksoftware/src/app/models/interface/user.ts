export interface User {
  userID: number;
  emailAddress: string;
  fullName: string;
  picture: string;
  phoneNumber: string;
  roleID: number;
  lastLogin: string;
  createdDate: string;
}

export interface ResponseData {
  data: User[];
}
