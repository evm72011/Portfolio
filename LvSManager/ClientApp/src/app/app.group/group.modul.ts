import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { GroupComponent } from "./group.component";
import { GroupRepository } from "./group.repository.service";
import { AddGroupComponent } from "./add-group.component";

@NgModule({
    imports:        [ FormsModule, BrowserModule ],
    declarations:   [ GroupComponent, AddGroupComponent ],
    exports:        [ GroupComponent, AddGroupComponent ],
    providers:      [ GroupRepository ] 
})
export class GroupModule { } 