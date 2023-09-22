import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit{
  constructor(){}

  ngOnInit(): void {
    
  }
  onSubmit(form: NgForm){
    console.log(form);
  }

}
