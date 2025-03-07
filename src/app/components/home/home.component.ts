import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
    id: string;
    sub: Subscription
    state: number = Math.floor(Math.random() * 100)

    constructor(private readonly route: ActivatedRoute) {
        this.id = route.snapshot.paramMap.get('id') ?? ''
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
          });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }
}
