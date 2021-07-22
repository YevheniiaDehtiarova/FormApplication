import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './components/user-form/user-form.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import {HttpClientModule} from '@angular/common/http';
import {IntlModule} from '@progress/kendo-angular-intl';
import { UserTableComponent } from './components/user-table/user-table.component';
import {UserService} from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserTableComponent,
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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
