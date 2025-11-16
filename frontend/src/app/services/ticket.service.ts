import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Ticket,
  CreateTicketDto,
  UpdateTicketStatusDto,
  ApiResponse
} from '../models/ticket.model';
import {TriageSuggestionResponse} from '../models/triage.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly apiUrl = 'http://localhost:8000/api/tickets';

  tickets = signal<Ticket[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getTickets(filters?: any): Observable<ApiResponse<Ticket[]>> {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          if (Array.isArray(filters[key])) {
            filters[key].forEach((value: any) => {
              params = params.append(`${key}[]`, value.toString());
            });
          } else {
            params = params.set(key, filters[key].toString());
          }
        }
      });
    }

    return this.http.get<ApiResponse<Ticket[]>>(this.apiUrl, { params }).pipe(
      tap({
        next: (response) => {
          this.tickets.set(response.data || []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      })
    );
  }

  getTicket(id: number): Observable<ApiResponse<Ticket>> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this.loading.set(false),
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      })
    );
  }

  createTicket(ticket: CreateTicketDto): Observable<ApiResponse<Ticket>> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.post<ApiResponse<Ticket>>(this.apiUrl, ticket).pipe(
      tap({
        next: (response) => {
          if (response.data) {
            this.tickets.update(tickets => [...tickets, response.data!]);
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      })
    );
  }

  updateTicketStatus(id: number, data: UpdateTicketStatusDto): Observable<ApiResponse<Ticket>> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.patch<ApiResponse<Ticket>>(`${this.apiUrl}/${id}`, data).pipe(
      tap({
        next: (response) => {
          if (response.data) {
            this.tickets.update(tickets =>
              tickets.map(t => t.id === id ? response.data! : t)
            );
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      })
    );
  }

  deleteTicket(id: number): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => {
          this.tickets.update(tickets => tickets.filter(t => t.id !== id));
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      })
    );
  }

  getTriageSuggestion(id: number): Observable<TriageSuggestionResponse> {
    return this.http.post<TriageSuggestionResponse>(`${this.apiUrl}/${id}/triage-suggest`, {});
  }

  applyTriageSuggestion(id: number, suggestion: any): Observable<ApiResponse<Ticket>> {
    return this.http.patch<ApiResponse<Ticket>>(`${this.apiUrl}/${id}`, {
      status: suggestion.suggested_status,
      priority: suggestion.suggested_priority,
      assignee_id: suggestion.suggested_assignee_id,
      tags: suggestion.suggested_tags
    });
  }

  getTags(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/tags/`);
  }
}
