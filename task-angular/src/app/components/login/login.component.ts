import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = this.formBuilder.group({
    email: ['diego@gmail.com', [Validators.required]],
    password: ['12345678', [Validators.required]],
  });

  hasError = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder
    , private toastr: ToastrService) { }

  ngOnInit(): void { }

  login() {
    this.hasError = false;
    this.authService.login(this.formLogin.value).subscribe(res => {
      if (res.status !== 200) {
        this.hasError = true
      }
    }, () => {
      this.hasError = true
      this.toastr.error('Lo sentimos, algo va mal!', 'Ups!');
    });
  }

}
