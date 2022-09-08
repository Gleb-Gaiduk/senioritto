import { DateVO } from '../../../../libs/building-blocks/domain/value-objects/date.value-object';
import { IDefaultValueObjectProps } from '../../../../libs/building-blocks/domain/value-objects/value-object.base';
import { ArgumentInvalidException } from '../../../../libs/exceptions/generic/argument-invalid.exception';
import { ArgumentOutOfRangeException } from '../../../../libs/exceptions/generic/argument-out-of-range.exception';

export class BirthDate extends DateVO {
  constructor(value: Date | string | number) {
    super(value);
  }

  protected validate(props: IDefaultValueObjectProps<Date>): void {
    const isDateInstance = props.value instanceof Date;
    const isNaN = Number.isNaN(props.value.getTime());

    if (!isDateInstance || isNaN) {
      throw new ArgumentInvalidException(
        'Date value provided to the DateVO value object is incorrect'
      );
    }

    const day = props.value.getDate();
    const month = props.value.getMonth();
    const year = props.value.getFullYear();

    if (!BirthDate._has18YearsOld(day, month, year)) {
      throw new ArgumentOutOfRangeException(
        'A person should be at least 18 years old'
      );
    }
  }

  private static _has18YearsOld(
    day: number,
    month: number,
    year: number
  ): boolean {
    return new Date(year + 18, month - 1, day) <= new Date();
  }
}
