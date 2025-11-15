import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Header component with authentication status and logout
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  /**
   * Get user initials for avatar
   */
  getUserInitials(): string {
    const name = this.authService.currentUser()?.name || '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  /**
   * Get user role name
   */
  getUserRole(): string {
    const role = this.authService.currentUser()?.role;
    return role?.name || 'User';
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to login
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to tickets
   */
  goToTickets(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tickets']);
    }
  }
}
