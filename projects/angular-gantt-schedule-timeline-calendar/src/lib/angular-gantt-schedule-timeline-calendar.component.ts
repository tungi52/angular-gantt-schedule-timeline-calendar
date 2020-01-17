import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnDestroy,
  ViewEncapsulation
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
  @Input() config: any;
  @Input() onState: (state) => void;

  GSTC: any;
  state: any;
  @ViewChild("gstcElement", { static: true })
  gstcElement: ElementRef;

  ngAfterViewInit() {
    const element = this.gstcElement.nativeElement;
    this.state = GSTC.api.stateFromConfig(this.config);
    this.onState(this.state);
    this.GSTC = GSTC({
      element,
      state: this.state
    });
  }

  ngOnDestroy() {
    this.state.destroy();
    this.GSTC.app.destroy();
  }
}
