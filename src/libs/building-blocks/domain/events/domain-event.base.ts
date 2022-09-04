import { ValidationGuard } from '../../../utils/validation-guard.utils';
import { UUID } from '../value-objects/uuid.value-object';

export type TDomainEventProps<TEventProps> = Omit<
  TEventProps,
  'id' | 'correlationId' | 'dateOccured'
> & {
  aggregateId: string;
  correlationId?: string;
  dateOccured?: number;
};

export abstract class DomainEvent {
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly dateOccured: number;
  /** ID for correlation purposes (for UnitOfWork, Integration Events,logs correlation etc).
   * This ID is set automatically in a publisher.
   */
  public correlationId: string;

  constructor(props: TDomainEventProps<unknown>) {
    if (ValidationGuard.isEmptyValue(props)) {
      throw new Error('DomainEvent props should not be empty');
    }

    this.id = UUID.generate().value;
    this.aggregateId = props.aggregateId;
    this.dateOccured = props.dateOccured || Date.now();
    if (props.correlationId) this.correlationId = props.correlationId;
  }
}
