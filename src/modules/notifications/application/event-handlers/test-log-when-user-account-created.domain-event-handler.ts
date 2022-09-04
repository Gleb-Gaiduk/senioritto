import { DomainEventHandler } from '../../../../libs/building-blocks/domain/events/domain-event-handler.base';
import { UserAccountCreatedDomainEvent } from '../../../IAM/domain/events/user-account-created.domain-event';

export class TestLogWhenUserAccountCreated extends DomainEventHandler {
  constructor() {
    super(UserAccountCreatedDomainEvent);
  }

  async handle(event: UserAccountCreatedDomainEvent): Promise<void> {
    const { aggregateId, firstName, lastName } = event;
    console.log('Event happend!');
    console.log('New user account event data: ', {
      aggregateId,
      firstName,
      lastName
    });
  }
}
