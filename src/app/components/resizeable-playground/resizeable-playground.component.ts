import { Component } from '@angular/core';
import { ResizeableComponent } from '../resizeable/resizeable.component';
import { TabPanelComponent } from "../tab-panel/tab-panel.component";

@Component({
  selector: 'app-resizeable-playground',
  imports: [ResizeableComponent, TabPanelComponent],
  templateUrl: './resizeable-playground.component.html',
  styleUrl: './resizeable-playground.component.scss'
})
export class ResizeablePlaygroundComponent {

}
