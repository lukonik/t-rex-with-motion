import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import "@lottiefiles/lottie-player";
import adapter from 'webrtc-adapter';
window.addEventListener('load', (event) => {
  bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
});
