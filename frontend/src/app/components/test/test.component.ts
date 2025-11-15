import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  protected readonly title = signal('Testowy komponent');
  protected apiResult = signal<string>('');

  constructor(private api: ApiService) {}

  fetchData() {
    this.api.getTestData().subscribe({
      next: (res) => this.apiResult.set(JSON.stringify(res)),
      error: (err) => this.apiResult.set('Błąd: ' + err.message),
    });
  }
}
