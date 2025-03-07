import {
    RouteReuseStrategy,
    DetachedRouteHandle,
    ActivatedRouteSnapshot,
} from '@angular/router';

/**
 * Saves state of tabs that contain `storeRout: true` and `resuseComponent: false`.
 */
export class TabRouteReuseStrategy implements RouteReuseStrategy {
    private readonly routeByUrl: Record<string, Route | null> = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return !!route.data['storeRoute'];
    }

    store(
        route: ActivatedRouteSnapshot,
        detachedTree: DetachedRouteHandle
    ): void {
        const key = this.stringify(route);
        this.routeByUrl[key] = { route: route, routeHandle: detachedTree };
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const routeKey = this.stringify(route);
        const isStored = !!route.routeConfig && !!this.routeByUrl[routeKey];
        return isStored;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const key = this.stringify(route);
        if (!route.routeConfig || !this.routeByUrl[key]) {
            return null;
        }
        return this.routeByUrl[key].routeHandle;
    }

    shouldReuseRoute(
        prev: ActivatedRouteSnapshot,
        next: ActivatedRouteSnapshot
    ): boolean {
        const sameRoute = prev.routeConfig === next.routeConfig;
        const reuseComponent = next.data['reuseComponent'];
        return sameRoute && reuseComponent;
    }

    stringify(route: ActivatedRouteSnapshot): string {
        return route.url
            .map((seg) => seg.path)
            .join('/')
            .trim()
            .replace(/\/$/, '');
    }
}

interface Route {
    route: ActivatedRouteSnapshot;
    routeHandle: DetachedRouteHandle;
}
