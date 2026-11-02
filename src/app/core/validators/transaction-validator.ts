// app/core/validators/transaction-validator.ts
export interface TransactionValidator {
  name: string;
  validate: (amount: number, recipientIban: string) => string | null;
}

export const TRANSACTION_VALIDATORS = new InjectionToken<
  TransactionValidator[]
>('TRANSACTION_VALIDATORS');

// Implementazioni
export const amountValidator: TransactionValidator = {
  name: 'AmountValidator',
  validate: (amount) => (amount <= 0 ? 'Importo deve essere positivo' : null),
};

export const dailyLimitValidator: TransactionValidator = {
  name: 'DailyLimitValidator',
  validate: (amount) =>
    amount > 10_000 ? 'Limite giornaliero superato' : null,
};

// Provider nel bootstrapApplication o nella route:
// providers: [
//   { provide: TRANSACTION_VALIDATORS, useValue: amountValidator,    multi: true },
//   { provide: TRANSACTION_VALIDATORS, useValue: dailyLimitValidator, multi: true },
// ]
