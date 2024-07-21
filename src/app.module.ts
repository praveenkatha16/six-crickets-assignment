import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { RouterModule } from "@angular/router";
import { MatSliderModule } from "@angular/material/slider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from "./components/app/app.component";
import { CameraComponent } from "./components/camera/camera.component";
import { CameraSettingsComponent } from "./components/camera-settings/camera-settings.component";
import { TimerComponent } from "./components/timer/timer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    CameraSettingsComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: CameraComponent,
      },
      {
        path: "timer",
        component: TimerComponent,
      },
    ]),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
