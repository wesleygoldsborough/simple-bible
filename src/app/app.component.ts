import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StateService } from './services/state.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { State } from './interfaces/state.interface';
import { Bible } from './classes/bible.class';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  appInitialized = false;
  stateKeySequence = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private stateService: StateService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.initializeApp();
  }

  @HostListener('window:keydown', ['$event']) keyPressEvent(event: any) {

    if (event.key) {

      // TESTING PURPOSES: (TODO: remove for production)
      // press WES in sequence on keyboard to log state to browser console
      // press WESX in sequence on keyboard to clear all local storage and reset the app state
      if (event.key.toUpperCase() === 'W') {
        if (this.stateKeySequence === 0) {
          this.stateKeySequence++;
        } else {
          this.stateKeySequence = 1;
        }
      }
      if (event.key.toUpperCase() === 'E') {
        if (this.stateKeySequence === 1) {
          this.stateKeySequence++;
        } else {
          this.stateKeySequence = 0;
        }
      }
      if (event.key.toUpperCase() === 'S') {
        if (this.stateKeySequence === 2) {
          this.stateKeySequence++;
          // log all relevant state data
          console.log(this.stateService.state.getValue());
        }
      }
      if (event.key.toUpperCase() === 'X') {
        if (this.stateKeySequence === 3) {
          // reset all state data and go back to initial view
          this.stateService.clear()
            .then(() => {
              this.router.navigate(['/']).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              });
            });
        }
        this.stateKeySequence = 0;
      }
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // ionic initialization
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // load saved state from local storage
      this.storageService.get('state').then((state: State) => {
        if (state) {
          if (!state?.currentBible) { // if no currentBible, initiate an empty one
            state.currentBible = new Bible();
          }
          this.stateService.replace(state).then(() => {
            this.appInitialized = true;
          });
        } else {
          const newState = { currentBible: new Bible() };
          this.stateService.replace(newState).then(() => {
            this.appInitialized = true;
          });
        }
      });
    });
  }

}
