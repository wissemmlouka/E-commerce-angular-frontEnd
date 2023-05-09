import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { FileHandle } from './_model/file.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  constructor(private sanitizer: DomSanitizer) {}
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#eee';
  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
  }
  /*
  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
    let fileHandel: FileHandel;
    const file: any = event.dataTransfer?.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
    fileHandel = {
      file,
      url,
    };
    this.files.emit(fileHandel);
  }
*/

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';

    let filesHandel: FileHandle[] = [];
    const filesList: any = event.dataTransfer?.files;
    for (let i = 0; i < filesList.length; i++) {
      const url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(filesList[i])
      );
      const fileHandel: FileHandle = {
        file: filesList[i],
        url: url,
      };
      filesHandel.push(fileHandel);
    }
    this.files.emit(filesHandel);
  }
}
