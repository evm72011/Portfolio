import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LinkComponent } from "./link.component";
import { LinkRepository } from "./link.repository.service";

@NgModule({
    imports:        [ FormsModule, BrowserModule ],
    declarations:   [ LinkComponent],
    exports:        [ LinkComponent],
    providers:      [ LinkRepository ] 
})
export class LinkModule { }  