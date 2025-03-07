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

    /**
     * Opens the selected tab as a new tab and closes the "New Tab".
     * @param tab 
     */
    openNewTab(tab: Tab) {
        this.tabService.getActiveTab$().pipe(take(1)).subscribe(activeTab => {
            // Remove "New Tab", which is the active tab
            this.tabService.removeTab(activeTab)
            // Add the selected tab
            let newTab = this.tabService.addNewTab(tab)
            if (newTab) {
                // Navigate to selected tab
                this.router.navigate([newTab.path, newTab.id])
            }
        })
    }
}
