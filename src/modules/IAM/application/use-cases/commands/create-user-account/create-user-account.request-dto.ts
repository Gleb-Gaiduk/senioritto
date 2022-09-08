import { EGender } from '../../../../domain/entities/user-account.entity';

export interface ICreateUserRequestDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: EGender;
  dateOfBirth: string;
}
