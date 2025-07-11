import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appSaveAndDisplayPicture]'
})
export class SaveAndDisplayPictureDirective {

  @Input('appSaveAndDisplayPicture') targetImgId!: string; // bind input to the target <img> ID

  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('change', ['$event'])
  onFileChange(event: Event): void{
    const inputEl = this.el.nativeElement;
    const files = inputEl.files;

    if(!files || files.length === 0){
      return; // exit if no piture provided
    }

    // get the selected file and converting into data url
    const file = files[0];
    const fileReader = new FileReader();

    // add a "load" event listener to the "fileReader" instance 
    fileReader.addEventListener('load', () => {
      const imageDataUrl = fileReader.result as string; // ensure is a string

      // find image and set its src
      const imgEl = document.getElementById(this.targetImgId) as HTMLImageElement | null;

      // set the "src" of the img element to display the image
      if (imgEl){
        imgEl.src = imageDataUrl;
      }

      // save to lcalStorage
      localStorage.setItem(this.targetImgId, imageDataUrl)
    })

    // start reading the image file as data URL
    fileReader.readAsDataURL(file);

  }

}
