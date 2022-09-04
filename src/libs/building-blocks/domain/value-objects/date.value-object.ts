import { IDefaultValueObjectProps, ValueObject } from './value-object.base';

export class DateVO extends ValueObject<Date> {
  constructor(value: Date | string | number) {
    const date =
      typeof value === 'string' ? new Date(Number(value)) : new Date(value);

    super({ value: date });
  }

  public get value(): Date {
    return this.props.value;
  }

  static now(): DateVO {
    return new DateVO(Date.now());
  }

  protected validate(props: IDefaultValueObjectProps<Date>): void {
    const isDateInstance = props.value instanceof Date;
    const isNaN = Number.isNaN(props.value.getTime());

    if (!isDateInstance || isNaN) {
      throw new Error(
        'Date value provided to the DateVO value object is incorrect'
      );
    }
  }
}
