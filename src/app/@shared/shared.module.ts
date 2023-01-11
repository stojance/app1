import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './loader/loader.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ConcatPipe } from './pipes/concat.pipe';
import { MouseOverColorDirective } from './directives/mouse-over-color.directive';

@NgModule({
  imports: [TranslateModule, CommonModule],
  declarations: [LoaderComponent, FileSizePipe, ConcatPipe, MouseOverColorDirective],
  exports: [LoaderComponent, FileSizePipe, ConcatPipe, MouseOverColorDirective],
})
export class SharedModule {}
