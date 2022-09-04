import { IDefaultValueObjectProps, ValueObject } from './value-object.base';

export abstract class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected abstract validate(props: IDefaultValueObjectProps<string>): void;
}
