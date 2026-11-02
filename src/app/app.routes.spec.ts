import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { appConfig } from './app.config';
import { MOCK_BUSINESS_SUMMARY, MOCK_PRIVATE_SUMMARY } from './core/models/account.model';
import { PrivateDashboardComponent } from './features/private/private-dashboard.component';
import { BusinessDashboardComponent } from './features/business/business-dashboard.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';

describe('account routes', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers, provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('uses the configuration and repository for each route', async () => {
    const harness = await RouterTestingHarness.create();
    const privateDashboard = await harness.navigateByUrl('/private', PrivateDashboardComponent);
    http.expectOne('/api/private/accounts/ACC-001/summary').flush(MOCK_PRIVATE_SUMMARY);
    harness.detectChanges();

    expect(privateDashboard.summary()?.area).toBe('PRIVATE');
    expect(harness.routeNativeElement?.textContent).toContain('Clienti Privati');
    expect(harness.routeNativeElement?.textContent).toContain('Mario Rossi');

    const businessDashboard = await harness.navigateByUrl('/business', BusinessDashboardComponent);
    http.expectOne('/api/business/accounts/BUS-001/summary').flush(MOCK_BUSINESS_SUMMARY);
    harness.detectChanges();

    expect(businessDashboard.summary()?.area).toBe('BUSINESS');
    expect(harness.routeNativeElement?.textContent).toContain('Clienti Business');
    expect(harness.routeNativeElement?.textContent).toContain('Max conti: 50');
    expect(harness.routeNativeElement?.textContent).toContain('LipariTech S.r.l.');
  });

  it('injects the admin notification config and uses the notification service', async () => {
    const harness = await RouterTestingHarness.create();
    const adminDashboard = await harness.navigateByUrl('/admin', AdminDashboardComponent);

    expect(adminDashboard.config).toEqual({
      position: 'top-right',
      duration: 5000,
      maxVisible: 3,
    });

    harness.routeNativeElement?.querySelector('button')?.click();
    harness.detectChanges();

    expect(harness.routeNativeElement?.textContent).toContain('success: Notifica admin');
  });
});
