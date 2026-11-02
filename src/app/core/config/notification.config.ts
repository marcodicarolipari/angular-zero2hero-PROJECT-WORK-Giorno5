import { InjectionToken } from '@angular/core';

export interface NotificationConfig {
  position: 'top-right' | 'bottom-right';
  duration: number; // ms
  maxVisible: number;
}

export const NOTIFICATION_CONFIG = new InjectionToken<NotificationConfig>('NOTIFICATION_CONFIG');
