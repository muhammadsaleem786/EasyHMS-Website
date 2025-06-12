import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { contact } from 'src/app/model/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  model: contact = new contact();
  constructor(private router: Router,private formBuilder: FormBuilder, private api: ApiService) { 
    
  }
  contactForm: FormGroup = this.formBuilder.group({
    Id:[''],    
    Name: ['', Validators.required],   
    Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    Phone: ['', [Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],   
    Speciality: [''],   
    Message: [''],   
  }
 );

 submitted = false;
 get f() { return this.contactForm.controls; }
  ngOnInit(): void {    
  }

  AddContact() {
     this.submitted = true;
     if (this.contactForm.invalid) {
       return;
     }     
     this.api.Post('api/Contact/Save', this.contactForm.value).subscribe((res) => {
      debugger
      if(res!=undefined){
        if (res.IsSuccess) {        
          this.submitted = false;
          this.contactForm.reset(); 
          alert(res.Message);
        }
        else {    
            alert(res.ErrorMessage); 
        }
      }      
     }, err => {
       console.log(err);
     }); 
   } 
   IsvalidPhone() {
    var re = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$');
    if (!re.test(this.model.Phone))
        this.model.Phone = '';
}
}
