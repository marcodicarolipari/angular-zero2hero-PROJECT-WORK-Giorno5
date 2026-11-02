// app/features/private/private-dashboard.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-private-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  // No CommonModule — solo le pipe usate
  // No async pipe — usiamo toSignal()
  template: `
    <section class="dashboard">
      <h2>Dashboard {{ areaLabel() }}</h2>

      @if (summary(); as s) {
        <div class="account-card">
          <p class="holder">{{ s.holderName }}</p>
          <p class="iban">{{ s.iban }}</p>
          <p class="balance">
            {{ s.balance | number: '1.2-2' }} {{ s.currency }}
          </p>
        </div>
      } @else {
        <p class="loading">Caricamento conto...</p>
      }
    </section>
  `,
  styleUrl: './private-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateDashboardComponent {
  private readonly accountService = inject(AccountService);

  // Signal derivato dal servizio — no ngOnInit, no subscribe manuale
  readonly summary = toSignal(this.accountService.getAccountSummary('ACC-001'));
  readonly areaLabel = this.accountService.getAreaLabel.bind(
    this.accountService,
  );
  // Oppure: readonly areaLabel = signal(this.accountService.getAreaLabel());
}
