const assert = require('node:assert/strict');

type TPrimitives = string | number | boolean;

export interface IDefaultValueObjectProps<TProps extends TPrimitives | Date> {
  value: TProps;
}

type TValueObjectProps<TProps> = TProps extends TPrimitives | Date
  ? IDefaultValueObjectProps<TProps>
  : TProps;

export abstract class ValueObject<TProps> {
  protected readonly props: TValueObjectProps<TProps>;

  constructor(props: TValueObjectProps<TProps>) {
    this._checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  protected abstract validate(props: TValueObjectProps<TProps>): void;

  public rawProps():
    | Readonly<TValueObjectProps<TProps>>
    | (TProps & (TPrimitives | Date)) {
    if (this._isDefaultValueObjectProps(this.props)) {
      return this.props.value;
    }

    return Object.freeze(structuredClone(this.props));
  }

  public isEqual(valueObject: ValueObject<TProps>): boolean {
    if (!valueObject) {
      return false;
    }

    const { props } = valueObject;

    if (this._isDefaultValueObjectProps(props) && !props.value) {
      return false;
    }

    try {
      assert.deepStrictEqual(this.props, props);

      return true;
    } catch (error) {
      return false;
    }
  }

  private _checkIfEmpty(props: TValueObjectProps<TProps>): void {
    if (!props) {
      throw new Error('Property cannot be empty');
    }

    if (this._isDefaultValueObjectProps(props) && !props.value) {
      throw new Error('Property cannot be empty');
    }
  }

  private _isDefaultValueObjectProps(
    props: unknown
  ): props is IDefaultValueObjectProps<TProps & (TPrimitives | Date)> {
    if (Object.prototype.hasOwnProperty.call(props, 'value')) {
      return true;
    }

    return false;
  }
}
