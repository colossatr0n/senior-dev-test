import { Component, inject, OnInit } from '@angular/core';
import { TabService } from '../../services/tab.service';
import { Observable, of } from 'rxjs';
import { Tab } from '../../model/tab.model';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-tab-nav',
  imports: [AsyncPipe, NgClass],
  templateUrl: './tab-nav.component.html',
  styleUrl: './tab-nav.component.scss'
})
export class TabNavComponent implements OnInit {
    tabService = inject(TabService)
    tabs$: Observable<Tab[]> = this.tabService.getTabs$();
    activeTab$: Observable<Tab> = this.tabService.getActiveTab()
    
    ngOnInit(): void {
        this.tabs$ = this.tabService.getTabs$()
    }

    setActive(tab: Tab) {
        this.tabService.setActive(tab);
    }
}
