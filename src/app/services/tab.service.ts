import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, shareReplay, take } from 'rxjs';
import { Tab } from '../model/tab.model';

@Injectable({
    providedIn: 'root',
})
export class TabService {
    private readonly tabsSubject = new BehaviorSubject<Tab[]>([]) 
    private readonly activeTabSubject = new BehaviorSubject<Tab>(new Tab('', ''))

    private readonly DEFAULT_TABS = new Array<Tab>()

    private readonly idsByPath = new Map<string, Set<number>>()

    constructor() {
        let defaultTabs = [
            new Tab('Home', 'home', undefined),
            new Tab('Shop', 'shop', undefined),
            new Tab('Search', 'search', undefined),
            new Tab('Resizeable Playground', 'resizeable', undefined),
        ]

        for (let tab of defaultTabs) {
            let tabWithId = this.generateTabWithId(tab)
            this.DEFAULT_TABS.push(tabWithId!)
        }
        
        this.setActive(this.DEFAULT_TABS[0])
        this.tabsSubject.next(this.DEFAULT_TABS)
    }
    
    
    
    getTabs$(): Observable<Tab[]> {
        return this.tabsSubject.asObservable().pipe(shareReplay())
    }
    
    getActiveTab$(): Observable<Tab> {
        return this.activeTabSubject.asObservable().pipe()
    }

    setActive(tab: Tab) {
        this.activeTabSubject.next(tab)
    }
    
    addNewTab(tab: Tab): Tab | null {
        let newTab = this.generateTabWithId(tab)
        if (!newTab) {
            window.alert('The max limit of tabs for this type has been reached. Please remove some tabs and try again.');
            return null;
        }
        this.setActive(newTab)
        this.tabsSubject.next([...this.tabsSubject.value, newTab])
        return newTab
    }

    removeTab(tab: Tab) {
        let idx = this.tabsSubject.value.indexOf(tab)
        let newTabs = this.tabsSubject.value.filter(t => t != tab)
        var activeIdx = idx - 1
        if (idx <= newTabs.length - 1) {
            activeIdx = idx
        }
        else if (idx == 0) {
            activeIdx = 0
        }

        this.tabsSubject.next(newTabs)
        if (tab.id) this.idsByPath.get(tab.path)?.delete(tab.id)
        
        if (newTabs.length > 0) {
            let activeTab = newTabs.at(activeIdx)
            this.setActive(activeTab!)
            console.log('ACTIVE')
            console.log(activeTab)
        }
    }

    private generateTabWithId(tab: Tab): Tab | null {
        var id;
        if (!this.idsByPath.has(tab.path)) {
            this.idsByPath.set(tab.path, new Set())
        }

        let ids = this.idsByPath.get(tab.path)

        if (tab.id && !ids?.has(tab.id)) {
            ids!.add(tab.id)
            id = tab.id
        } else {
            let max = 5

            for (let i = 1; i <= max; i++) {
                if (!ids?.has(i)) {
                    ids?.add(i)
                    id = i
                    break
                }
                if (i == max) {
                    console.log(`Max number of tabs for path ${tab.path} reached.`)
                    return null
                }
            }
        }
        return new Tab(tab.title, tab.path, id)
    }
    
    getDefaultTabs() {
        // Prevent modification of default tabs by returning a copy
        return this.DEFAULT_TABS.map(t => new Tab(t.title, t.path, t.id))
    }
}
