import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { QualificationComponent } from "./qualification.component";
import { QualificationRepository } from "./qualification.repository.service";
import { AddQualificationComponent } from "./add-qualification.component";

@NgModule({
    imports:        [ FormsModule, BrowserModule ],
    declarations:   [ QualificationComponent, AddQualificationComponent ],
    exports:        [ QualificationComponent, AddQualificationComponent ],
    providers:      [ QualificationRepository ] 
})
export class QualificationModule { } 