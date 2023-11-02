import { Subject, takeUntil } from 'rxjs';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

export class EventLogger {
  private destroy$ = new Subject<void>();

  private readonly logger = new Logger(EventLogger.name);

  constructor(private eventBus: EventBus) {
    this.eventBus.pipe(takeUntil(this.destroy$)).subscribe((event: IEvent) => {
      this.logger.log('EVENT receive: ' + event.toString() + '');
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
