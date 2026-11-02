import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <section class="dashboard dashboard--admin">
      <h2>Dashboard Admin</h2>
      <p class="config-info">
        Notifiche: {{ config.position }}, durata {{ config.duration }}ms
      </p>
      <button type="button" (click)="notify.success('Notifica admin')">Mostra notifica</button>
      <ul>
        @for (n of notify.notifications(); track n.id) {
          <li>{{ n.type }}: {{ n.message }}</li>
        }
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  readonly notify = inject(NotificationService);
  readonly config = this.notify.config;
}
