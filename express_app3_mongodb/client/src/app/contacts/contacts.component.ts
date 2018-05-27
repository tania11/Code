import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactService]
})
export class ContactsComponent implements OnInit {

  contacts:Contact[];
  errorMessage:string;
  first_name:string;
  last_name:string;
  phone:string;
  editContactModal:Contact={
    "_id":"",
    "first_name":"",
    "last_name":"",
    "phone":"",
    "created_date":"",
    "updated_date":""
  };

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts()
        .subscribe(contacts=>
          this.contacts = contacts);
  }
  
  getAllContacts(){
    this.contactService.getContacts()
        .subscribe(contacts=> this.contacts = contacts);
  }

  deleteContact(id:any){
    this.contactService.deleteContact(id)
        .subscribe(contactsRefreshDelete=>this.getAllContacts());
      
  }

  editContact(contact){
    console.log(contact);
    this.contactService.editContact(contact)
        .subscribe(contactsRefreshDelete=>this.getAllContacts());
      
  }

  addContact(){
    const newContact={
      first_name:this.first_name,
      last_name:this.last_name,
      phone:this.phone
    };

    this.contactService.addContact(newContact)
        .subscribe(contactRefreshAdd=>this.getAllContacts());
  }
}
