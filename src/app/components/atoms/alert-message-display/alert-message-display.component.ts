import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';

@Component({
  selector: 'app-alert-message-display',
  templateUrl: './alert-message-display.component.html',
  styleUrls: ['./alert-message-display.component.scss'],
})
export class AlertMessageDisplayComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private alertService: AlertMessageService) {}

  ngOnInit(): void {
    this.alertService.successMessage$.subscribe((message) => {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, 4000);
    });

    this.alertService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    });
  }
}
