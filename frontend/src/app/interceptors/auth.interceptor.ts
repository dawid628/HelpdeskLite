import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const publicUrls = [
    '/login',
    '/logout',
    'weatherapi.com',
    'api.weatherapi.com'
  ];

  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (token && !isPublicUrl && req.url.includes('localhost:8000')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 &&
        !isPublicUrl &&
        req.url.includes('localhost:8000')) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
