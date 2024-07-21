import { Component, inject, forwardRef } from "@angular/core";
import {
  FormBuilder,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";
import { CameraSettings } from "src/models/camera.model";

@Component({
  selector: "app-camera-settings",
  templateUrl: "./camera-settings.component.html",
  styleUrls: ["./camera-settings.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CameraSettingsComponent),
      multi: true,
    },
  ],
})
export class CameraSettingsComponent implements ControlValueAccessor {
  fb = inject(FormBuilder);
  cameraSettings = this.fb.nonNullable.group({
    light: this.fb.nonNullable.group({ start: 0, end: 0 }),
    distance: this.fb.nonNullable.group({ start: 0, end: 0 }),
  });
  private onChange!: (value: CameraSettings) => void;

  ngOnInit() {
    this.cameraSettings.valueChanges
      .pipe(distinctUntilChanged(isEqual))
      .subscribe(() => {
        if (this.onChange) {
          this.onChange(this.cameraSettings.getRawValue());
        }
      });
  }

  writeValue(settings: CameraSettings): void {
    this.cameraSettings.setValue(settings);
  }

  registerOnChange(fn: (value: CameraSettings) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
