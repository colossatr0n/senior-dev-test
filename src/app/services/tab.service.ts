import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, shareReplay } from 'rxjs';
import { Tab } from '../model/tab.model';

@Injectable({
    providedIn: 'root',
})
export class TabService {
    tabsSubject = new ReplaySubject<Tab[]>(1) 
    tabs: Tab[] = [
        new Tab('Home', 'home', 1),
        new Tab('Home', 'home', 2)
    ]
    activeTabSubject = new ReplaySubject<Tab>(1)

    constructor() {
        this.setActive(this.tabs[0])
        this.tabsSubject.next(this.tabs)
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
}
