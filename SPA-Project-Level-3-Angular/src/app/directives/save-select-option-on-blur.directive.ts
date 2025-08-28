import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSaveSelectOptionOnBlur]'
})
export class SaveSelectOptionOnBlurDirective {

  constructor( private el: ElementRef<HTMLSelectElement>) { };

  @HostListener ('blur') 
  onBlur(): void{

    // get the native <select> element the directive is attached to
    // reference to the native <select> element using ElementRef
    // gives direct access to its properties like selectedIndex, id, value, etc.

    const selectEl = this.el.nativeElement; // native <select> element

    const selectedIndex = selectEl.selectedIndex;
    const selectedText = selectEl.options[selectedIndex]?.text?.trim();
    const targetId = selectEl.id;

    // detrmine (okrslic) the drop-down or combo-box from class in element
    const isDropDown = selectEl.classList.contains('all-drop-down');
    const isComboBox = selectEl.classList.contains('all-combo-box');

    try { // try-catch block since we're saving data to localStorage

      if(isDropDown && selectedText && selectedText !== 'Select Role Category'){  // avoids storing empty or placeholder values
      console.log(`The "${selectedText}" is saved at ${targetId} local storage`);
      localStorage.setItem(targetId, selectedText);
      
      // selectEl.value = 'Select Role Category';
      }
      
      if(isComboBox && selectedText && selectedText !== 'Select Location'){   // avoids storing empty or placeholder values
        console.log(`The "${selectedText}" is saved at ${targetId} local storage`);
        localStorage.setItem(targetId, selectedText);
        
        // selectEl.value = 'Select Location';
      }
      
    } catch (er) {
      console.error("Failed to save the \"select option\" value: ", er);
      
    }
  }
}
