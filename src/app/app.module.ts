import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import {HttpClientModule} from '@angular/common/http';
import {IntlModule} from '@progress/kendo-angular-intl';


@NgModule({
  declarations: [
    AppComponent,
    FormLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
    ReactiveFormsModule,
    DropDownsModule,
    DialogsModule,
    HttpClientModule,
    IntlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
