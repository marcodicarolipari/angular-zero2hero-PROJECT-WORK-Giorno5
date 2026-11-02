// app/core/repositories/http-account.repository.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCOUNT_API_CONFIG } from '../config/account-api.config';
import { AccountRepository } from './account.repository';
import { AccountSummary } from '../models/account.model';

@Injectable() // NON providedIn: 'root' — sarà registrato esplicitamente
export class HttpAccountRepository extends AccountRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ACCOUNT_API_CONFIG);

  getAccountSummary(accountId: string): Observable<AccountSummary> {
    return this.http.get<AccountSummary>(
      `${this.config.baseUrl}/accounts/${accountId}/summary`,
    );
  }
}
