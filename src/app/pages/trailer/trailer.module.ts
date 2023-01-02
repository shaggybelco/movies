import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrailerPageRoutingModule } from './trailer-routing.module';

import { TrailerPage } from './trailer.page';
import { NgxYoutubePlayerModule } from 'ngx-youtube-embed';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrailerPageRoutingModule, 
    NgxYoutubePlayerModule.forRoot()
  ],
  declarations: [TrailerPage]
})
export class TrailerPageModule {}
