import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';;
import { RegisterComponent } from './register/register.component'

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FeedbackComponent } from './feedback/feedback.component';
import { NewTableComponent } from './new-table/new-table.component';
import { TablesComponent } from './tables/tables.component'

import { MatTableModule } from '@angular/material/table';
import { DetailsComponent } from './details/details.component'

import { FlexLayoutModule } from "@angular/flex-layout";

import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from "@angular/material/input"
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        PickerModule,
        FormsModule,
        MatTableModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatMenuModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
        ,
        RegisterComponent
        ,
        FeedbackComponent
        ,
        NewTableComponent,
        TablesComponent,
        DetailsComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }


        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }