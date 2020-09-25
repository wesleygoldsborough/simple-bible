import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadPage } from './read.page';

import { HomePageRoutingModule } from './read-routing.module';
import { SelectBookModalComponent } from 'src/app/modals/select-book/select-book.modal';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedPipesModule
  ],
  declarations: [ReadPage, SelectBookModalComponent],
})
export class ReadPageModule {}
