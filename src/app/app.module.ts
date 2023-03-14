import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginInterceptorService } from './login/login-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    QuestionManagementComponent,
    UserManagementComponent,
  ],
  imports: [
    // NgMultiSelectDropDownModule,
    AngularSignaturePadModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }, {
      provide: APP_BASE_HREF, useValue: '/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
