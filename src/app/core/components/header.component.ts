import { Component, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  template: `
    <header style="display:flex;justify-content:space-between;padding:12px 16px;background:#eee">
      <strong>Home Banking</strong>
      <button type="button" (click)="login()">Login</button>
    </header>

    <div
      style="position:fixed;right:16px;display:flex;flex-direction:column;gap:8px;z-index:1000"
      [style.top]="notifications.config.position === 'top-right' ? '16px' : null"
      [style.bottom]="notifications.config.position === 'bottom-right' ? '16px' : null"
    >
      @for (n of notifications.notifications(); track n.id) {
        <div
          role="alert"
          style="padding:10px 14px;border-radius:4px;color:#fff;cursor:pointer"
          [style.background]="n.type === 'success' ? '#2e7d32' : n.type === 'error' ? '#c62828' : '#ed6c02'"
          (click)="notifications.dismiss(n.id)"
        >
          {{ n.message }}
        </div>
      }
    </div>
  `,
})
export class HeaderComponent {
  protected readonly notifications = inject(NotificationService);

  login(): void {
    this.notifications.success('Benvenuto! Accesso effettuato con successo.');
  }
}
