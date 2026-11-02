import { Injectable, inject, signal } from '@angular/core';
import { NOTIFICATION_CONFIG } from '../config/notification.config';

export type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly config = inject(NOTIFICATION_CONFIG);

  private nextId = 0;
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  success(msg: string): void {
    this.push('success', msg);
  }

  error(msg: string): void {
    this.push('error', msg);
  }

  warning(msg: string): void {
    this.push('warning', msg);
  }

  dismiss(id: number): void {
    this._notifications.update((list) => list.filter((n) => n.id !== id));
  }

  private push(type: NotificationType, message: string): void {
    const id = this.nextId++;
    this._notifications.update((list) =>
      [...list, { id, type, message }].slice(-this.config.maxVisible),
    );
    setTimeout(() => this.dismiss(id), this.config.duration);
  }
}
