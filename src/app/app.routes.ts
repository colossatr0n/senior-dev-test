import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent() {
            return import('./components/home/home.component').then(m => m.HomeComponent)
        },
    },
    {
        path: 'home',
        loadComponent() {
            return import('./components/home/home.component').then(m => m.HomeComponent)
        },
    },
    {
        path: 'newtab',
        loadComponent() {
            return import('./components/new-tab-panel/new-tab-panel.component').then(m => m.NewTabPanelComponent)
        },
    }
];
