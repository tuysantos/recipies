import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-refresh-data',
  templateUrl: './refresh-data.component.html',
  styleUrls: ['./refresh-data.component.scss']
})
export class RefreshDataComponent implements OnInit {

  @Output() refreshEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  updateData(reload: boolean): void {
    this.refreshEvent.emit(reload);
  }

}
