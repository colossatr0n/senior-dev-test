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
        path: 'home/:id',
        loadComponent() {
            return import('./components/home/home.component').then(m => m.HomeComponent)
        },
        data: {
            storeRoute: true,
            reuseComponent: false,
        },
    },
    {
        path: 'shop/:id',
        loadComponent() {
            return import('./components/shop/shop.component').then(m => m.ShopComponent)
        },
        data: {
            storeRoute: true,
            reuseComponent: false,
        },
    },

    {
        path: 'search/:id',
        loadComponent() {
            return import('./components/search/search.component').then(m => m.SearchComponent)
        },
        data: {
            storeRoute: true,
            reuseComponent: false,
        },
    },
    {
        path: 'newtab/:id',
        loadComponent() {
            return import('./components/new-tab-panel/new-tab-panel.component').then(m => m.NewTabPanelComponent)
        },
        data: {
            storeRoute: true,
            reuseComponent: true,
        },
    },
    {
        path: 'resizeable/:id',
        loadComponent() {
            return import('./components/resizeable-playground/resizeable-playground.component').then(m => m.ResizeablePlaygroundComponent)
        },
        data: {
            storeRoute: true,
            reuseComponent: false,
        },
    },
];
