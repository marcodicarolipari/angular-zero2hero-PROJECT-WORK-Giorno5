// app/core/services/transfer.service.ts
@Injectable({ providedIn: 'root' })
export class TransferService {
  // Multi-provider: Angular inietta l'array di tutti i validatori registrati
  private readonly validators = inject(TRANSACTION_VALIDATORS);

  validateTransfer(amount: number, iban: string): string[] {
    return this.validators
      .map((v) => v.validate(amount, iban))
      .filter((e): e is string => e !== null);
  }
}
