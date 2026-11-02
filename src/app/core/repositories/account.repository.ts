// app/core/repositories/account.repository.ts
import { Observable } from 'rxjs';
import { AccountSummary } from '../models/account.model';

// Abstract class = token DI + tipo TypeScript in un colpo solo
// Esiste a runtime (a differenza di 'interface') → usabile con inject()
export abstract class AccountRepository {
  abstract getAccountSummary(accountId: string): Observable<AccountSummary>;
}