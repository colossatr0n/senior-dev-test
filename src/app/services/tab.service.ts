import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, shareReplay } from 'rxjs';
import { Tab } from '../model/tab.model';

@Injectable({
    providedIn: 'root',
})
export class TabService {
    tabsSubject = new ReplaySubject<Tab[]>(1) 
    private readonly DEFAULT_TABS: Tab[] = [
        new Tab('Home', 'home', 1),
        new Tab('Home', 'home', 2),
        new Tab('Home', 'home', 3)
    ]
    activeTabSubject = new ReplaySubject<Tab>(1)

    constructor() {
        this.setActive(this.DEFAULT_TABS[0])
        this.tabsSubject.next(this.DEFAULT_TABS)
    }
    
    getTabs$(): Observable<Tab[]> {
        return this.tabsSubject.asObservable().pipe(shareReplay())
    }
    
    getActiveTab(): Observable<Tab> {
        return this.activeTabSubject.asObservable().pipe(shareReplay())
    }

    setActive(tab: Tab) {
        this.activeTabSubject.next(tab)
    }
    
    addTab(tab: Tab) {
        this.setActive(tab)
        this.tabsSubject.next([...this.DEFAULT_TABS, tab])
    }
    
    getDefaultTabs() {
        // Prevent modification of default tabs by returning a copy
        return this.DEFAULT_TABS.map(t => new Tab(t.title, t.path, t.id))
    }
}
