import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@NgModule({
    declarations: [
        SafeHtmlPipe
    ],
    exports: [
        SafeHtmlPipe
    ]
})
export class SharedPipesModule {}
