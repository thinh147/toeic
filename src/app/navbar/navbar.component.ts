import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
  ) { }
  sidebarState: string;
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.indexOf('question') > 0) this.sidebarState = 'question';
        if (event.urlAfterRedirects.indexOf('user') > 0) this.sidebarState = 'user';
      });

    this.loginService.user.subscribe({
      next: user => {
        this.user = user;
      }, error: error => {

      }
    });
  }
  getUser() {
    return this.user?.username;
  }
  onLogout() {

  }
}
