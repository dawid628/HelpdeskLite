import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { TicketListComponent } from './app/components/ticket-list/ticket-list.component';
import { authGuard } from './app/guards/auth.guard';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'tickets',
        component: TicketListComponent,
        canActivate: [authGuard]
      },
    ])
  ]
}).catch(err => console.error(err));
