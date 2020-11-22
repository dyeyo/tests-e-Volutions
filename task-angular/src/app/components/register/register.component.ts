import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasErrorAPI = false;
  formUsers = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  register(): void {
    this.hasErrorAPI = false;
    if (this.formUsers.valid) {
      this.authService.register(this.formUsers.value).subscribe(), () => {
        this.hasErrorAPI = true;
      }
    }
  }
}
