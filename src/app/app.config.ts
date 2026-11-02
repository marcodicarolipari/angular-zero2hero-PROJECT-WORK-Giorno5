import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NOTIFICATION_CONFIG } from './core/config/notification.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: NOTIFICATION_CONFIG,
      useValue: { position: 'top-right', duration: 4000, maxVisible: 3 },
    },
  ]
};
