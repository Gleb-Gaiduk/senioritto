import {
  IDefaultValueObjectProps,
  ValueObject
} from '../../../../libs/building-blocks/domain/value-objects/value-object.base';
import { ArgumentInvalidException } from '../../../../libs/exceptions/generic/argument-invalid.exception';
import { EGender } from '../entities/user-account.entity';

export class Gender extends ValueObject<EGender> {
  constructor(value: EGender) {
    super({ value });
  }

  protected validate(props: IDefaultValueObjectProps<string>): void {
    const trimedLowerCasedValue = props.value.trim().toLowerCase();
    if (
      trimedLowerCasedValue !== EGender.FEMALE &&
      trimedLowerCasedValue !== EGender.MALE
    ) {
      throw new ArgumentInvalidException('Incorrect gender argument');
    }
  }
}
