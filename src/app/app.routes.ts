// app/app.routes.ts
import { Routes } from '@angular/router';
import { ACCOUNT_API_CONFIG } from './core/config/account-api.config';
import { AccountRepository } from './core/repositories/account.repository';
import { HttpAccountRepository } from './core/repositories/http-account.repository';
import { NOTIFICATION_CONFIG } from './core/config/notification.config';
import { NotificationService } from './core/services/notification.service';
import { AccountService } from './core/services/account.service';

export const routes: Routes = [
  {
    path: 'private',
    // Lazy loading — questo injector è separato dal root
    loadComponent: () =>
      import('./features/private/private-dashboard.component')
        .then(m => m.PrivateDashboardComponent),
    providers: [
      // ACCOUNT_API_CONFIG ha già il default PRIVATE nel factory — non serve override
      // Servizio e repository condividono lo scope della route.
      AccountService,
      { provide: AccountRepository, useClass: HttpAccountRepository },
    ],
  },
  {
    path: 'business',
    loadComponent: () =>
      import('./features/business/business-dashboard.component')
        .then(m => m.BusinessDashboardComponent),
    providers: [
      // Override della config per l'area Business
      {
        provide: ACCOUNT_API_CONFIG,
        useValue: {
          baseUrl:     '/api/business',
          area:        'BUSINESS' as const,
          maxAccounts: 50,
        },
      },
      AccountService,
      { provide: AccountRepository, useClass: HttpAccountRepository },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-dashboard.component')
        .then(m => m.AdminDashboardComponent),
    providers: [
      {
        provide: NOTIFICATION_CONFIG,
        useValue: { position: 'top-right', duration: 5000, maxVisible: 3 },
      },
      // NotificationService è providedIn root: va ri-registrato qui per leggere l'override
      NotificationService,
    ],
  },
];