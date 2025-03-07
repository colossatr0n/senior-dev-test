import { Component, inject } from '@angular/core';
import { TabPanelComponent } from "../tab-panel/tab-panel.component";
import { TabService } from '../../services/tab.service';
import { Tab } from '../../model/tab.model';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-tab-panel',
  imports: [TabPanelComponent],
  templateUrl: './new-tab-panel.component.html',
  styleUrl: './new-tab-panel.component.scss'
})
export class NewTabPanelComponent {
    tabService = inject(TabService)
    menuTabs = this.tabService.getDefaultTabs()
    
    constructor(private readonly router: Router) {
    }

    openNewTab(tab: Tab) {
        this.tabService.getActiveTab$().pipe(take(1)).subscribe(activeTab => {
            this.tabService.removeTab(activeTab)
            let newTab = this.tabService.addNewTab(tab)
            if (newTab) {
                this.router.navigate([newTab.path, newTab.id])
            }
        })
    }
}
