import { Component } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { WebStorageService } from './services/web-storage.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eatZilla';
  profileResponse: any;

  constructor(private headerComponent: HeaderComponent, private profileService: ProfileService, private webStorageService: WebStorageService) {

  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(data => {
      this.profileResponse = data;
      if (this.profileResponse.status) {
      } else {
        this.webStorageService.removeUserData();
        this.headerComponent.ngOnInit();
      }
    }, err => {
      this.webStorageService.removeUserData();
      this.headerComponent.ngOnInit();
    })
  }
}
