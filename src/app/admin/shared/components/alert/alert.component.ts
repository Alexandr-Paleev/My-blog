import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    template: `
    <div class="alert" [ngClass]="type" *ngIf="text">
      {{text}}
    </div>
  `,
    styles: [`
    .alert { padding: 10px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; }
    .success { color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6; }
    .warning { color: #8a6d3b; background-color: #fcf8e3; border-color: #faebcc; }
    .danger { color: #a94442; background-color: #f2dede; border-color: #ebccd1; }
  `]
})
export class AlertComponent implements OnInit, OnDestroy {

    @Input() delay = 5000;

    public text = '';
    public type = 'success';
    aSub = new Subscription();

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.aSub = this.alertService.alert$.subscribe(alert => {
            this.text = alert.text;
            this.type = alert.type;

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                this.text = '';
            }, this.delay);
        });
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }

}
