// app/core/services/account.service.ts
// Servizio di dominio: usa il repository, aggiunge logica di business
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountRepository } from '../repositories/account.repository';
import { ACCOUNT_API_CONFIG } from '../config/account-api.config';
import { AccountSummary } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  // inject() — no constructor, contesto di iniezione come campo
  private readonly repo = inject(AccountRepository);
  private readonly config = inject(ACCOUNT_API_CONFIG);

  getAreaLabel(): string {
    return this.config.area === 'PRIVATE'
      ? '👤 Clienti Privati'
      : '🏢 Clienti Business';
  }

  getAccountSummary(accountId: string): Observable<AccountSummary> {
    return this.repo.getAccountSummary(accountId).pipe(
      // logica di business: arricchimento del modello
      map((s) => ({ ...s, area: this.config.area })),
    );
  }
}
