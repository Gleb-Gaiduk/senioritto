import { Email } from "./value-objects/email.value-object";

export interface IUserProps {
  email: Email;
  firstName: ;
  lastName: ;
  isVerified?: boolean;
  isAdmin?: boolean;
  accessToken?: ;
  refreshToken?: ;
  lastLogin?: Date;
  isDeleted?: boolean;
}