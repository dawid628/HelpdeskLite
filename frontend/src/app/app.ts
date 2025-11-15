import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { TestComponent } from './components/test/test.component';

bootstrapApplication(TestComponent).catch(err => console.error(err));
