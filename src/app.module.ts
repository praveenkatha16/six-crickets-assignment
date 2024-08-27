import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { RouterModule } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { CameraComponent } from "./components/camera/camera.component";
import { TimerComponent } from "./components/timer/timer.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
