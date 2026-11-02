// app/core/services/config.service.ts
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly http   = inject(HttpClient);
  private config: AppConfig | null = null;

  loadConfig(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/assets/config.json').pipe(
        tap(cfg => { this.config = cfg; }),
      )
    );
  }

  get(key: keyof AppConfig): string {
    if (!this.config) throw new Error('Config non ancora caricata');
    return this.config[key] as string;
  }
}

// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (cfg: ConfigService) => () => cfg.loadConfig(),
      deps: [ConfigService],
      multi: true,
    },
  ],
});