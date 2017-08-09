/*
 The MIT License (MIT)

 Copyright (c) 2017 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

// import { NgModule, ModuleWithProviders } from '@angular/core';

// import { ModalGalleryModule } from './src/modal-gallery.module';
// export { ModalGalleryModule } from './src/modal-gallery.module';

export { Image, ImageModalEvent, Action, Description, KeyboardConfig } from './src/components/modal-gallery.component';

export { ButtonsConfig } from './src/interfaces/buttons-config.interface';

import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModalGalleryComponent } from './src/components/modal-gallery.component';
import { DIRECTIVES } from './src/directives/directives';
import { UpperButtonsComponent } from './src/components/upper-buttons.component';
import { KeyboardService, } from './src/services/keyboard.service';
import { GalleryComponent } from './src/components/gallery.component';
import { KeyboardServiceConfig } from './src/interfaces/keyboard-service-config.interface';

export const KEYBOARD_CONFIGURATION = new InjectionToken<KeyboardServiceConfig>('KEYBOARD_CONFIGURATION');

/**
 * Module with `forRoot` method to import it in the root module of your application.
 */
@NgModule({
  imports: [ CommonModule ],
  declarations: [ AngularModalGalleryComponent, UpperButtonsComponent, GalleryComponent, DIRECTIVES ],
  exports: [ AngularModalGalleryComponent ]
})
export class ModalGalleryModule {
  static forRoot(config?: KeyboardServiceConfig): ModuleWithProviders {
    return {
      ngModule: ModalGalleryModule,
      providers: [
        {
          provide: KEYBOARD_CONFIGURATION,
          useValue: config ? config : {}
        },
        {
          provide: KeyboardService,
          useFactory: setupKeyboardService,
          deps: [ KEYBOARD_CONFIGURATION ]
        }
      ]
    };
  }
}

export function setupKeyboardService(injector: KeyboardServiceConfig) {
  return new KeyboardService(injector);
}








// /**
//  * Exported Main Module without `forRoot`.
//  */
// @NgModule({
//   imports: [
//     AngularModalGalleryModule.forRoot()
//   ],
//   exports: [
//     AngularModalGalleryModule
//   ]
// })
// export class AngularRootModalGalleryModule {
// }
//
// /**
//  * Exported Main Module with `forRoot`.
//  */
// @NgModule({
//   imports: [
//     AngularModalGalleryModule
//   ],
//   exports: [
//     AngularModalGalleryModule
//   ]
// })
// export class ModalGalleryModule {
//   static forRoot(): ModuleWithProviders {
//     return {
//       ngModule: AngularRootModalGalleryModule
//     };
//   }
// }
