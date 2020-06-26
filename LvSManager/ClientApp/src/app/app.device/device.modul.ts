import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DeviceComponent } from "./device.component";
import { AddDeviceComponent } from "./add-device.component";
import { DeviceFillPosition } from "./device.fill-position.component";
import { DeviceRepository } from "./device.repository.service";
import { DevicePinRights } from "./device.pin-rights.component";

@NgModule({
    imports:        [ FormsModule, BrowserModule ],
    declarations:   [ DeviceComponent, AddDeviceComponent, DeviceFillPosition, DevicePinRights ],
    exports:        [ DeviceComponent, AddDeviceComponent, DeviceFillPosition, DevicePinRights ],
    providers:      [ DeviceRepository ] 
})
export class DeviceModule { }  