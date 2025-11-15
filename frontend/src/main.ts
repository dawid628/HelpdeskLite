import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TestComponent } from './app/components/test/test.component';

bootstrapApplication(TestComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));
