import {
  Command,
  TCommandProps
} from '../../../../../../libs/building-blocks/application/command.base';
import { EGender } from '../../../../domain/entities/user-account.entity';

export class CreateUserAccountCommand extends Command<CreateUserAccountCommand> {
  public readonly email: string;
  public readonly password: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly gender: EGender;
  public readonly dateOfBirth: string;

  constructor(props: TCommandProps<CreateUserAccountCommand>) {
    super(props);

    this.email = props.email;
    this.password = props.password;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.gender = props.gender;
    this.dateOfBirth = props.dateOfBirth;
  }
}
