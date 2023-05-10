import { NgForOfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  public registerUser(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      (res) => {
        registerForm.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
