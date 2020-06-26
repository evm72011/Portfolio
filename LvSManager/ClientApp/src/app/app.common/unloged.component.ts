import { Component } from '@angular/core';
import { ApplicationService } from "./application.service";
import { SessionService } from "../app.session/session.service";

/**
 * Component for showing the picture "Bitte melden Sie sich an der Cloud an ..."
 */
@Component({
  selector: 'app-unloged',
  templateUrl: './unloged.component.html',
  styleUrls: ['./css/fade-animation.css', './unloged.component.css']
})
export class UnlogedComponent {
    constructor(
        public session: SessionService,
        public application: ApplicationService) { }
} 