import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, shareReplay, take } from 'rxjs';
import { Tab } from '../model/tab.model';

/**
 * Manages tab state.
 */
@Injectable({
    providedIn: 'root',
})
export class TabService {
    private readonly tabsSubject = new BehaviorSubject<Tab[]>([]) 
    private readonly activeTabSubject = new BehaviorSubject<Tab>(new Tab('', ''))

    private readonly DEFAULT_TABS = new Array<Tab>()

    private readonly idsByPath = new Map<string, Set<number>>()

    constructor() {
        // Set up default tabs
        let defaultTabs = [
            new Tab('Home', 'home', undefined),
            new Tab('Shop', 'shop', undefined),
            new Tab('Search', 'search', undefined),
            new Tab('Resizeable Playground', 'resizeable', undefined),
        ]

        // Generate IDs for each tab
        for (let tab of defaultTabs) {
            let tabWithId = this.generateTabWithId(tab)
            this.DEFAULT_TABS.push(tabWithId!)
        }
        
        // Set active tab and default tabs
        this.setActive(this.DEFAULT_TABS[0])
        this.tabsSubject.next(this.DEFAULT_TABS)
    }
    
    /**
     * Gets tabs.
     * @returns List of Tabs Observable
     */
    getTabs$(): Observable<Tab[]> {
        return this.tabsSubject.asObservable().pipe(shareReplay())
    }
    
    /**
     * Gets active tab.
     * @returns Tab Observable
     */
    getActiveTab$(): Observable<Tab> {
        return this.activeTabSubject.asObservable().pipe()
    }

    /**
     * Sets a tab to be active.
     * @param tab 
     */
    setActive(tab: Tab) {
        this.activeTabSubject.next(tab)
    }
    
    /**
     * Creates a new tab and assigns an ID for it.
     * @param tab 
     * @returns 
     */
    addNewTab(tab: Tab): Tab | null {
        // Regnerate tab with an ID 
        let newTab = this.generateTabWithId(tab)
        console.log(newTab)
        if (!newTab) {
            window.alert('The max limit of tabs for this type has been reached. Please remove some tabs and try again.');
            return null;
        }
        this.setActive(newTab)
        this.tabsSubject.next([...this.tabsSubject.value, newTab])
        return newTab
    }

    /**
     * Removes the tab
     * @param tab 
     */
    removeTab(tab: Tab) {
        // Get index of tab to remove so we can choose the next active tab
        let idx = this.tabsSubject.value.indexOf(tab)
        // Remove tab
        let newTabs = this.tabsSubject.value.filter(t => t != tab)
        // Find new active index
        var activeIdx = idx - 1
        if (idx <= newTabs.length - 1) {
            activeIdx = idx
        }
        else if (idx == 0) {
            activeIdx = 0
        }

        // Emit new tabs
        this.tabsSubject.next(newTabs)
        // Remove tab from ids map
        if (tab.id) this.idsByPath.get(tab.path)?.delete(tab.id)
        
        // Set new active tab
        if (newTabs.length > 0) {
            let activeTab = newTabs.at(activeIdx)
            this.setActive(activeTab!)
        }
    }

    /**
     * Regenerates the given tab but with an ID. IDs are store by Tab path.
     * @param tab 
     * @returns 
     */
    private generateTabWithId(tab: Tab): Tab | null {
        var id;
        // If path not store yet, initialize with a set
        if (!this.idsByPath.has(tab.path)) {
            this.idsByPath.set(tab.path, new Set())
        }

        // Get IDs set
        let ids = this.idsByPath.get(tab.path)

        // If id not in ids, add it
        if (tab.id && !ids?.has(tab.id)) {
            ids!.add(tab.id)
            id = tab.id
        } else {
            // Max of 5 tabs per path
            let max = 5

            // Try to find new ID between 1 and 5
            for (let i = 1; i <= max; i++) {
                if (!ids?.has(i)) {
                    ids?.add(i)
                    id = i
                    break
                }
                // If max reached, warn and return
                if (i == max) {
                    console.log(`Max number of tabs for path ${tab.path} reached.`)
                    return null
                }
            }
        }
        return new Tab(tab.title, tab.path, id)
    }
    
    /**
     * Deep copy of default tabs
     * @returns Deep copy of default tabs
     */
    getDefaultTabs() {
        // Prevent modification of default tabs by returning a copy
        return this.DEFAULT_TABS.map(t => new Tab(t.title, t.path, t.id))
    }
}
