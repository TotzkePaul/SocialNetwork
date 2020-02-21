import { Component, OnInit } from '@angular/core';

import { AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { 

    this.currentUser = this.authenticationService.currentUserValue
  }

  ngOnInit() {
  }

}
