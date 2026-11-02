// app/core/config/account-api.config.ts
import { InjectionToken } from '@angular/core';

export type AccountArea = 'PRIVATE' | 'BUSINESS';

export interface AccountApiConfig {
  baseUrl: string;
  area: AccountArea;
  maxAccounts: number; // Business può avere più conti collegati
}

// Token con valore di default (area Privati)
export const ACCOUNT_API_CONFIG = new InjectionToken<AccountApiConfig>(
  'ACCOUNT_API_CONFIG',
  {
    providedIn: 'root',
    factory: (): AccountApiConfig => ({
      baseUrl: '/api/private',
      area: 'PRIVATE',
      maxAccounts: 5,
    }),
  },
);
