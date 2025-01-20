import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../core/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatCheckboxModule, MatSlideToggleModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  @Input() UserID: number = 0;
  @Input() Editing: boolean = false;
  @Output() close  = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      town: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      admin: [false],
      registrationDate: [new Date().toISOString().split('T')[0], [Validators.required]],
      photo: ['']
    });
  }

  ngOnInit(): void {
    console.log(this.UserID)
    if(this.Editing){
      const user = this.userService.getUserById(this.UserID)
      if (user) {
        this.userForm.patchValue(user);
        console.log(user)
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userForm.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.userForm.valid) {
      
      if(this.userForm.get('photo')?.value === ''){
        this.userForm.patchValue({ photo: 'https://w7.pngwing.com/pngs/998/956/png-transparent-profile-pic-illustration-thumbnail.png' });
      }

      const newUser: User = {
        id: Math.floor(Math.random() * 1000),
        ...this.userForm.value
      };
      this.userService.addUser(newUser);
      this.userForm.reset();
      this.closeModal();
    }
  }

  editUser() {
    this.userService.editUser(this.UserID, this.userForm.value);
    this.closeModal();
  }

  closeModal(){
    this.UserID = 0;
    this.Editing = false;
    this.close.emit(false);
  }
}