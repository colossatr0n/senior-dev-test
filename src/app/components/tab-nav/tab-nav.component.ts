import { Component, inject, OnInit } from '@angular/core';
import { TabService } from '../../services/tab.service';
import { Observable, of, take } from 'rxjs';
import { Tab } from '../../model/tab.model';
import { AsyncPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-nav',
  imports: [AsyncPipe, NgClass],
  templateUrl: './tab-nav.component.html',
  styleUrl: './tab-nav.component.scss'
})
export class TabNavComponent implements OnInit {
    tabService = inject(TabService)
    tabs$: Observable<Tab[]> = this.tabService.getTabs$();
    activeTab$: Observable<Tab> = this.tabService.getActiveTab$()
    
    constructor(private readonly router: Router){}
    
    ngOnInit(): void {
        // Get tabs and open active tab
        this.tabs$ = this.tabService.getTabs$()
        this.tabService.getActiveTab$().pipe(take(1)).subscribe(t => this.openTab(t))
    }

    /**
     * Sets tab as active
     * @param tab 
     */
    setActive(tab: Tab) {
        this.tabService.setActive(tab);
    }
    
    /**
     * Opens an existing tab
     * @param tab 
     */
    openTab(tab: Tab) {
        this.setActive(tab)
        this.router.navigate([tab.path, tab.id])
    }
    
    /**
     * Creates and opens a new tab.
     */
    openNewTab() {
        this.tabService.addNewTab(new Tab("New Tab", "newtab", 1))
        this.router.navigate(["newtab", 1])
    }

    /**
     * Closes the tab and navigates to the next active tab
     * @param tab 
     */
    closeTab(tab: Tab) {
        this.tabService.removeTab(tab)
        this.activeTab$.pipe(take(1))
             .subscribe(t => {
                this.router.navigate([t.path, t.id])
            })
    }
}
