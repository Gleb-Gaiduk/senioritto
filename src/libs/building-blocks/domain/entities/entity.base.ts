import { ValidationGuard } from '../../../utils/validation-guard.utils';
import { DateVO } from '../value-objects/date.value-object';
import { ID } from '../value-objects/id.value-object';

export interface IBaseEntityProps {
  id: ID;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export interface ICreateEntityProps<TEntityProps> {
  id: ID;
  props: TEntityProps;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export abstract class Entity<TEntityProps> {
  protected readonly props: TEntityProps;
  protected abstract _id: ID;
  private readonly _createdAt: DateVO;
  private _updatedAt: DateVO;

  constructor({
    id,
    createdAt,
    updatedAt,
    props
  }: ICreateEntityProps<TEntityProps>) {
    this.setId(id);
    this._validateProps(props);
    const nowDate = DateVO.now();
    this._createdAt = createdAt || nowDate;
    this._updatedAt = updatedAt || nowDate;
    this.props = props;
    this.validateInvariant();
  }

  get id(): ID {
    return this._id;
  }

  private setId(id: ID): void {
    this._id = id;
  }

  get createdAt(): DateVO {
    return this._createdAt;
  }

  get updatedAt(): DateVO {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public abstract validateInvariant(): void;

  public equals(object?: Entity<TEntityProps>): boolean {
    if (object === null || object === undefined) return false;
    if (this === object) return true;
    if (!Entity.isEntity(object)) return false;

    return this.id ? this.id.isEqualTo(object.id) : false;
  }

  public getPropsCopy(): TEntityProps & IBaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props
    };

    return Object.freeze(propsCopy);
  }

  private _validateProps(props: TEntityProps): void {
    if (ValidationGuard.isEmptyValue(props)) {
      throw new Error('Entity props should not be empty');
    }

    if (typeof props !== 'object') {
      throw new Error('Entity props should be an object');
    }

    const maxProps = 30;

    if (Object.keys(props).length > maxProps) {
      throw new Error(
        `Entity props should not have more than ${maxProps} properties`
      );
    }
  }
}
