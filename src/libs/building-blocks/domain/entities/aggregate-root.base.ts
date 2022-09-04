import { DomainEvents } from '../events/domain-events';
import { DomainEvent } from '../events/domain-event.base';
import { Entity } from './entity.base';

export abstract class AggregateRoot<TEntityProps> extends Entity<TEntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
    DomainEvents.addAggregateToPublishList(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
