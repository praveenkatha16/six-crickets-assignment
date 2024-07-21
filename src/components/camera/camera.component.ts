import { Component, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { hasCompatibleHardware } from "src/utils/camera.utils";

let id = 3;

@Component({
  selector: "app-camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.css"],
})
export class CameraComponent {
  fb = inject(FormBuilder);
  desiredConfig = this.fb.nonNullable.control({
    light: { start: 1, end: 6 },
    distance: { start: 100, end: 600 },
  });
  cameras = this.fb.nonNullable.array([
    {
      light: { start: 1, end: 4 },
      distance: { start: 100, end: 500 },
    },
    {
      light: { start: 1, end: 2 },
      distance: { start: 500, end: 800 },
    },
    {
      light: { start: 4, end: 6 },
      distance: { start: 100, end: 400 },
    },
    {
      light: { start: 2, end: 6 },
      distance: { start: 400, end: 600 },
    },
  ]);

  get hasCompatibleHardware(): boolean {
    return hasCompatibleHardware(
      this.desiredConfig.getRawValue(),
      this.cameras.getRawValue()
    );
  }

  addCamera() {
    this.cameras.push(
      this.fb.nonNullable.control({
        light: { start: 0, end: 0 },
        distance: { start: 0, end: 0 },
      })
    );
  }

  delete(index: number) {
    this.cameras.removeAt(index);
  }
}
