import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Ticket,
  CreateTicketDto,
  UpdateTicketStatusDto,
  ApiResponse
} from '../models/ticket.model';

/**
 * Service for managing tickets via API
 */
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly apiUrl = 'http://localhost:8000/api/tickets';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Signal for reactive tickets list
  tickets = signal<Ticket[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Get all tickets with optional filters
   */
  getTickets(filters?: any): Observable<ApiResponse<Ticket[]>> {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          params = params.set(key, filters[key].toString());
        }
      });
    }

    return this.http.get<ApiResponse<Ticket[]>>(this.apiUrl, {
      headers: this.headers,
      params
    }).pipe(
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

  /**
   * Get single ticket
   */
  getTicket(id: number): Observable<ApiResponse<Ticket>> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(
        tap({
          next: () => this.loading.set(false),
          error: (err) => {
            this.error.set(err.message);
            this.loading.set(false);
          }
        })
      );
  }

  /**
   * Create new ticket
   */
  createTicket(ticket: CreateTicketDto): Observable<ApiResponse<Ticket>> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.post<ApiResponse<Ticket>>(this.apiUrl, ticket, { headers: this.headers })
      .pipe(
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

  /**
   * Update ticket status
   */
  updateTicketStatus(id: number, data: UpdateTicketStatusDto): Observable<ApiResponse<Ticket>> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.patch<ApiResponse<Ticket>>(
      `${this.apiUrl}/${id}`,
      data,
      { headers: this.headers }
    ).pipe(
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

  /**
   * Delete ticket
   */
  deleteTicket(id: number): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(
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
}
