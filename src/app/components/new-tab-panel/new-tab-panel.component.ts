import { Component, inject } from '@angular/core';
import { TabPanelComponent } from "../tab-panel/tab-panel.component";
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-new-tab-panel',
  imports: [TabPanelComponent],
  templateUrl: './new-tab-panel.component.html',
  styleUrl: './new-tab-panel.component.scss'
})
export class NewTabPanelComponent {
    tabService = inject(TabService)
    menuTabs = this.tabService.getDefaultTabs()

}
