import { MaterialModule } from './shared/modules/material.module';
import { AuthService } from './shared/services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryPageComponent } from './pages/entry-page/entry-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DatePipe } from '@angular/common';
import { TextEditPageComponent } from './pages/text-edit-page/text-edit-page.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewerPageComponent } from './pages/viewer-page/viewer-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const FirebaseModules = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    EntryPageComponent,
    DashboardPageComponent,
    TextEditPageComponent,
    ViewerPageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...FirebaseModules,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  providers: [
    AuthService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
