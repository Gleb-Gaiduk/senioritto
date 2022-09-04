import { ID } from './id.value-object';
import { IDefaultValueObjectProps } from './value-object.base';
import { v4 as uuidV4, validate } from 'uuid';

export class UUID extends ID {
  static generate(): UUID {
    return new UUID(uuidV4());
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate(props: IDefaultValueObjectProps<string>): void {
    if (!validate(props.value)) {
      throw new Error('Incorrect UUID format');
    }
  }
}
