import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AlertComponent } from "./alert.component";

@NgModule({
    imports:        [ FormsModule, BrowserModule ],
    declarations:   [ AlertComponent ],
    exports:        [ AlertComponent ],
    providers:      [ ] 
})
export class AlertModule { } 