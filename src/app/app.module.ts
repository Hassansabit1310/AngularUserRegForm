import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SignInComponent } from './sign-in/sign-in.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './helpers/fake-backend';
import { HomeComponent } from './home/home.component';
import {MatTableModule} from '@angular/material/table';
import { UpdateUsersComponent } from './update-users/update-users.component';
import {MatSelectModule} from '@angular/material/select';
import { PostsComponent } from './posts/posts.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { GetpostsComponent } from './getposts/getposts.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ToolbarComponent,
    AlertComponent,
    HomeComponent,
    UpdateUsersComponent,
    PostsComponent,
    GetpostsComponent
  
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
