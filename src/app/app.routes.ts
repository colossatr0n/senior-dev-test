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
    }
];
