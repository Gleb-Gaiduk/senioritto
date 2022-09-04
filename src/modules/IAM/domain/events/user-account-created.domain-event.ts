import {
  DomainEvent,
  TDomainEventProps
} from '../../../../libs/building-blocks/domain/events/domain-event.base';

interface IUserAccountCreatedDomainEventProps {
  firstName: string;
  lastName: string;
}

export class UserAccountCreatedDomainEvent extends DomainEvent {
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(props: TDomainEventProps<IUserAccountCreatedDomainEventProps>) {
    const { firstName, lastName, ...restProps } = props;
    super(restProps);
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
