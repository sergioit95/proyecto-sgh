import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnChanges{

  @Input() title = '';
  @Output() dataFromChild = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.dataFromChild.emit('data from child component')

  }

}
