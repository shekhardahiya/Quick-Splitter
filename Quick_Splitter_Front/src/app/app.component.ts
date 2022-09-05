import { Component, OnInit } from '@angular/core';
import { DataProviderService } from './data-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Bill-splittor';
  loggedInUser;
  upi = '826990922@ybl';

  constructor(private api: DataProviderService) {
    this.api.userData.subscribe((receiveddata) => {
      console.log(receiveddata);
      this.loggedInUser = receiveddata;
      // this.loggedInUser = receiveddata;
    });
  }
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'))?.userName;
  }
  logOut() {
    this.loggedInUser = '';
  }
}
