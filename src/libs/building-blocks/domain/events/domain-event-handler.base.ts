import { DomainEvent } from './domain-event.base';
import { DomainEvents, TDomainEventClass } from './domain-events';

export abstract class DomainEventHandler {
  private readonly _event: TDomainEventClass;

  constructor(event: TDomainEventClass) {
    this._event = event;
  }

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEvents.subscribe(this._event, this);
  }
}
