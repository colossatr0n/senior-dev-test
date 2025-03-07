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
    // Generate a random number to display on each home component as 
    // a visual aid to verify state
    state: number = Math.floor(Math.random() * 100)

    constructor(private readonly route: ActivatedRoute) {
        // Store the ID. This will be used to visually verify the state of this component
        // vs other home components.
        this.id = route.snapshot.paramMap.get('id') ?? ''
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
          });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }
}
