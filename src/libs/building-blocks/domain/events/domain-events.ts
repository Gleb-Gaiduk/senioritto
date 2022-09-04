import { final } from '../../../utils/final.decarator';
import { AggregateRoot } from '../entities/aggregate-root.base';
import { ID } from '../value-objects/id.value-object';
import { DomainEventHandler } from './domain-event-handler.base';
import { DomainEvent } from './domain-event.base';

type TEventName = string;
export type TDomainEventClass = new (...args: never[]) => DomainEvent;

@final
export class DomainEvents {
  private static subscribers: Map<TEventName, DomainEventHandler[]> = new Map();
  private static aggregates: AggregateRoot<unknown>[] = [];

  public static subscribe<TEventHandler extends DomainEventHandler>(
    event: TDomainEventClass,
    eventHandler: TEventHandler
  ): void {
    const eventName: TEventName = event.name;

    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }

    this.subscribers.get(eventName)?.push(eventHandler);
  }

  public static addAggregateToPublishList(
    aggregate: AggregateRoot<unknown>
  ): void {
    const isAggregateFound = Boolean(this._findAggregateById(aggregate.id));
    if (!isAggregateFound) this.aggregates.push(aggregate);
  }

  private static _removeAggregateToPublishList(
    aggregate: AggregateRoot<unknown>
  ): void {
    const index = this.aggregates.findIndex((agr) => agr.equals(aggregate));
    this.aggregates.splice(index, 1);
  }

  public static async publishAllForAggrigate(
    aggregateId: ID,
    // logger:,
    correlationId?: string
  ): Promise<void> {
    const aggregate = this._findAggregateById(aggregateId);

    if (aggregate) {
      await Promise.all(
        aggregate.domainEvents.map((event) => {
          if (correlationId && !event.correlationId) {
            event.correlationId = correlationId;
          }

          return this._publish(event);
        })
      );

      aggregate.clearEvents();
      this._removeAggregateToPublishList(aggregate);
    }
  }

  private static async _publish(
    event: DomainEvent
    // logger:,
  ): Promise<void> {
    const eventName: string = event.constructor.name;

    if (this.subscribers.has(eventName)) {
      const handlers = this.subscribers.get(eventName) || [];

      await Promise.all(
        handlers.map((handler) => {
          console.log(
            `[${handler.constructor.name}] handling ${event.constructor.name} ${event.aggregateId}`
          );
          return handler.handle(event);
        })
      );
    }
  }

  private static _findAggregateById(id: ID): AggregateRoot<unknown> | void {
    for (const aggregate of this.aggregates) {
      if (aggregate.id.isEqualTo(id)) return aggregate;
    }
  }
}
