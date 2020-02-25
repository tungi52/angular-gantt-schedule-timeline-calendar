import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  OnDestroy,
  ViewEncapsulation,
  EventEmitter
} from "@angular/core";
import GSTC from "gantt-schedule-timeline-calendar/dist/index.esm.js";

@Component({
  selector: "gstc",
  template: `
    <div class="gstc" #gstcElement></div>
  `,
  styleUrls: [
    "../../../../node_modules/gantt-schedule-timeline-calendar/dist/style.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class GSTCComponent implements AfterViewInit, OnDestroy {
  private GSTC: any;
  private state: any;
  private _config: any;

  @Input()
  public get config(): any {
    return this._config;
  }

  public set config(value: any) {
    this._config = value;

    if (this.GSTC) {
      let newConfig = GSTC.api.stateFromConfig(this.config).data.config;
      this.GSTC.app.vidoInstance.state.update("config", newConfig);
      this.GSTC.app.update();
    } else {
      this.createApp();
    }
  }

  @Output() onState: EventEmitter<any> = new EventEmitter();

  @ViewChild("gstcElement", { static: true }) gstcElement: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.createApp();
  }

  ngOnDestroy() {
    this.destroyApp();
  }

  private createApp() {
    if (this._config) {
      const element = this.gstcElement.nativeElement;
      this.state = GSTC.api.stateFromConfig(this.config);
      this.onState.emit(this.state);
      this.GSTC = GSTC({
        element,
        state: this.state
      });
    }
  }

  private destroyApp() {
    this.GSTC.app.destroy();
    this.state.destroy();
  }
}
