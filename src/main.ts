import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(FormsModule),
  ],
});

// Asegurar que la plataforma está lista antes de usar Capacitor plugins
if (Capacitor.isNativePlatform()) {
  Keyboard.setScroll({ isDisabled: false });
}
