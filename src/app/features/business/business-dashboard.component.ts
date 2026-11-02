// app/features/business/business-dashboard.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { AccountService } from '../../core/services/account.service';
import { ACCOUNT_API_CONFIG } from '../../core/config/account-api.config';

@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <section class="dashboard dashboard--business">
      <h2>Dashboard {{ areaLabel }}</h2>
      <p class="config-info">Max conti: {{ maxAccounts }}</p>

      @if (summary(); as s) {
        <div class="account-card account-card--business">
          <p class="holder">{{ s.holderName }}</p>
          <p class="iban">{{ s.iban }}</p>
          <p class="balance">
            {{ s.balance | number: '1.2-2' }} {{ s.currency }}
          </p>
        </div>
      } @else {
        <p class="loading">Caricamento conto business...</p>
      }
    </section>
  `,
  styleUrl: './business-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDashboardComponent {
  private readonly accountService = inject(AccountService);
  private readonly config = inject(ACCOUNT_API_CONFIG);

  // Qui config.area === 'BUSINESS' grazie all'override nella route
  readonly areaLabel = this.accountService.getAreaLabel();
  readonly maxAccounts = this.config.maxAccounts;
  readonly summary = toSignal(this.accountService.getAccountSummary('BUS-001'));
}
