import { TestLogWhenUserAccountCreated } from './test-log-when-user-account-created.domain-event-handler';

export const notificationsDomainEventHandlers = [
  new TestLogWhenUserAccountCreated()
];
