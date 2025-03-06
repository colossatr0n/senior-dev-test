import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, shareReplay } from 'rxjs';
import { Tab } from '../model/tab.model';

@Injectable({
    providedIn: 'root',
})
export class TabService {
    tabsSubject = new ReplaySubject<Tab[]>(1) 
    tabs: Tab[] = [
        new Tab('Home', 'home', 1)
    ]

    constructor() {
        this.tabsSubject.next(this.tabs)
    }
    
    getTabs$(): Observable<Tab[]> {
        return this.tabsSubject.asObservable().pipe(shareReplay())
    }
}
