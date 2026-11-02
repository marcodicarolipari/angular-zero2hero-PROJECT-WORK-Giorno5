// app/core/models/account.model.ts
export interface AccountSummary {
  id: string;
  holderName: string;
  iban: string;
  balance: number;
  currency: string;
  area: 'PRIVATE' | 'BUSINESS';
}

export const MOCK_PRIVATE_SUMMARY: AccountSummary = {
  id: 'ACC-001',
  holderName: 'Mario Rossi',
  iban: 'IT60X054280110101000000001',
  balance: 12_500.75,
  currency: 'EUR',
  area: 'PRIVATE',
};

export const MOCK_BUSINESS_SUMMARY: AccountSummary = {
  id: 'BUS-001',
  holderName: 'LipariTech S.r.l.',
  iban: 'IT60X054280110101000000099',
  balance: 345_000.0,
  currency: 'EUR',
  area: 'BUSINESS',
};
