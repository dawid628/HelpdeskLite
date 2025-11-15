import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {TicketListComponent} from './app/components/ticket-list/ticket-list.component';

bootstrapApplication(TicketListComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));
