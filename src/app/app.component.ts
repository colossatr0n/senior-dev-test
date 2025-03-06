import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabPanelComponent } from "./components/tab-panel/tab-panel.component";
import { TabNavComponent } from "./components/tab-nav/tab-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabPanelComponent, TabNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'welbyte';
}
