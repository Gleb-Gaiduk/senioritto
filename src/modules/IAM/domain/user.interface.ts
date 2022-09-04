import { Email } from './value-objects/email.value-object';

export interface IUserProps {
  email: Email;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  accessToken?: string;
  refreshToken?: string;
  lastLogin?: Date;
  isDeleted?: boolean;
}
