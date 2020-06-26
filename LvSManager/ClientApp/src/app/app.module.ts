import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { RootComponent } from './root.component';
import { ApplicationService } from "./app.common/application.service";
import { SessionService } from "./app.session/session.service";
import { RequestService } from "./app.common/request.service";

import { SessionModule } from "./app.session/session.module";
import { DeviceModule } from "./app.device/device.modul";
import { GroupModule } from "./app.group/group.modul";
import { LinkModule } from "./app.link/link.modul";
import { QualificationModule } from "./app.qualification/qualification.modul";
import { AlertModule } from "./app.alert/alert.modul";

import { UnlogedComponent } from "./app.common/unloged.component";
import { DialogComponent } from "./app.common/dialog.component";

@NgModule({ 
  declarations: [
    RootComponent,
    UnlogedComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SessionModule,
    DeviceModule,
    GroupModule,
    LinkModule,
    QualificationModule,
    AlertModule
  ],
  providers: [ApplicationService, SessionService, RequestService],
  bootstrap: [RootComponent]
})
export class AppModule { }  
