import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-edit-job-employer',
  templateUrl: './add-edit-job-employer.component.html',
  styleUrl: './add-edit-job-employer.component.css'
})
export class AddEditJobEmployerComponent implements OnInit, AfterViewInit {

  // binding elements using properties and "@ViewChild" decorator properties
  spanEmployerName = '';
  
  @ViewChild('imgElement') imgElementRef! : ElementRef<HTMLImageElement>;
  
  
  constructor(){}

  
  ngOnInit(): void {
    
    this.getEmployerNameFromLS();
  }

  ngAfterViewInit(): void {
    
    this.getEmployerPictureFromLS();
  }

  
  // all methods: --------------------------------

  getEmployerNameFromLS(): void{
    const savedEmployerName = localStorage.getItem('employer-profile-employer-name') || 'Employer Name';

    if (savedEmployerName){      
      this.spanEmployerName = savedEmployerName.trim();
    }
  }

  getEmployerPictureFromLS(): void{
    const savedImage = localStorage.getItem('employer-profile-picture-src');
    const imgElement = this.imgElementRef.nativeElement;

    if(savedImage){
      imgElement.src = savedImage;
    }
  }
}
