import { ArgumentNotProvidedException } from '../../exceptions/generic/argument-not-provided.exception';
import { ValidationGuard } from '../../utils/validation-guard.utils';
import { UUID } from '../domain/value-objects/uuid.value-object';

export type TCommandProps<TProps> = Omit<TProps, 'id' | 'correlationId'> &
  Partial<Command<TProps>>;

export class Command<TProps> {
  /**
   * Command id, in case if we want to save it
   * for auditing purposes and create a correlation/causation chain
   */
  public readonly id: string;

  /** ID for correlation purposes (for UnitOfWork, for commands that
   *  arrive from other microservices,logs correlation etc).
   */
  public readonly correlationId: string;

  constructor(props: TCommandProps<TProps>) {
    if (ValidationGuard.isEmptyValue(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty'
      );
    }

    this.id = props.id || UUID.generate().value;
    this.correlationId = props.correlationId || UUID.generate().value;
  }
}
