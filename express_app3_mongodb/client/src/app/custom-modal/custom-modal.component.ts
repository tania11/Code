import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import{ Contact } from '../contact';
@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit{

  @Input() rowDetails:Contact;
  @Output() editDetails=new EventEmitter<Contact>();

  constructor() { }

  ngOnInit() {
  }

  editContactDetails(rowDetailsEdit){
    console.log('Hello');
    this.editDetails.emit(rowDetailsEdit);
  }
}
