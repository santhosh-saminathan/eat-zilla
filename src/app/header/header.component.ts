import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignUpService } from './../services/signup.service';
import { ProfileService } from './../services/profile.service';
import { WebStorageService } from './../services/web-storage.service';
import { ToastrService } from 'ngx-toastr';
// import { HomeComponent } from './../home/home.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: any = {};
  termsAndConditions: boolean = true;
  validPassword: boolean = true;
  requiredField: boolean = true;
  login: any = {};

  loginResponse: any = {};
  forgotPasswordResponse: any;
  signupResponse: any;
  profileResponse: any;
  newPasswordResponse: any;
  userProfileDetails: any;

  loggedIn: boolean = false;
  forgotPassword: boolean = false;
  checkOtpScreen: boolean = false;
  resetPasswordScreen: boolean = false;
  newPassword: any;
  errorMessage: any;
  otp: any;



  constructor(private toastr: ToastrService, private router: Router, private signUpService: SignUpService, private profileService: ProfileService, private webStorageService: WebStorageService) { }


  closeLoginModal(){
    $('#login').modal('hide');
  }

  ngOnInit() {
    
    this.login.phone = "9600771099";
    this.login.password = "12345678";

    if (this.webStorageService.getAuthId() && this.webStorageService.getAuthToken()) {
      this.loginResponse.user_name = this.webStorageService.getUserName();
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.redirectToHome();
    }
  }

  redirectToSearch() {
    this.router.navigate(['/search']);
  }

  redirectToHelp() {
    this.router.navigate(['/help']);
  }

  redirectToCart() {
    this.router.navigate(['/cart']);
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  getProfileDetails() {
    // this.profileService.getProfile().subscribe(data => {
    //   this.loggedIn = true;
    //   this.profileResponse = data;
    //   if (this.profileResponse.status) {
    //     this.userProfileDetails = this.profileResponse.data[0];
    //     this.loginResponse = { user_name: this.userProfileDetails.name };
    //   }
    // }, err => {
    //   console.log(err);
    // })
  }

  passwordCheck(event) {
    if (this.userDetails.password === this.userDetails.cnfmPassword) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }
  }

  forgotPasswordScreen() {
    this.forgotPassword = true;
  }

  showLoginScreen() {
    this.forgotPassword = false;
    this.checkOtpScreen = false;
    this.resetPasswordScreen = false;
  }

  acceptTermsAndConditions(event) {
    if (event.target.checked) {
      this.termsAndConditions = true;
    } else {
      this.termsAndConditions = false;
    }
  }

  registerUser() {
    if (this.userDetails.password === this.userDetails.cnfmPassword) {
      this.validPassword = true;
      if (this.termsAndConditions && this.validPassword && this.userDetails.phone && this.userDetails.password.length > 7 && this.userDetails.email) {
        let obj = {
          phone: this.userDetails.phone,
          email: this.userDetails.email,
          first_name: this.userDetails.firstName,
          last_name: this.userDetails.lastName,
          password: this.userDetails.password,
          device_type: 'web',
          login_type: 0
        }
        this.signUpService.registerUser(obj).subscribe(data => {
          this.signupResponse = data;
          if (this.signupResponse.status) {
            this.toastr.success('', 'Register User Success');
            this.webStorageService.storeAuthId(this.signupResponse.authId);
            this.webStorageService.storeAuthToken(this.signupResponse.authToken);

            setTimeout(() => {
              $('#register').modal("hide");
              this.loggedIn = true;

            }, 1000);
          } else {
            this.toastr.error('', this.signupResponse.message);
          }

        }, err => {
          console.log(err);
          this.toastr.error('', 'Register user error');
        })
      } else {
        this.requiredField = false;
      }
    } else {
      this.validPassword = false;
    }

  }

  loginUser() {
    if (this.login.phone && this.login.password) {
      this.login.device_type = 'web';
      this.errorMessage = null;
      this.login.login_type = 0;
      this.signUpService.loginUser(this.login).subscribe(data => {
        this.loginResponse = data;
        if (this.loginResponse.status) {
          console.log(this.loginResponse);
          this.webStorageService.storeAuthId(this.loginResponse.authId);
          this.webStorageService.storeAuthToken(this.loginResponse.authToken);
          this.webStorageService.storeUserName(this.loginResponse.user_name);
          this.webStorageService.storeUserPic(this.loginResponse.profile_image);
          this.toastr.success('', 'Login Success');

          setTimeout(() => {
            $('#login').modal("hide")
            this.loggedIn = true;
          }, 1000);

        } else {
          this.errorMessage = "Invalid login credentials";
        }
      }, err => {
        this.toastr.error('', 'Invalid Login');
        console.log(err);
      })
    }
  }


  logout() {
   console.log("called");
    this.signUpService.logout().subscribe(data => {
      this.webStorageService.removeUserData();
      this.ngOnInit();
      this.toastr.success('', 'Logged Out Successfully');
    }, err => {
      console.log(err);
    })
  }

  changeToMobileView() {

    if (!document.getElementById("mobileView").className.includes("active") && !document.getElementById("sideView").className.includes("show")) {
      document.getElementById("mobileView").classList.add("active");
      document.getElementById("sideView").classList.add("show");
    } else {
      document.getElementById("mobileView").classList.remove("active");
      document.getElementById("sideView").classList.remove("show");
    }


  }

  forgotPasswordFun() {
    this.errorMessage = null;
    if (this.login.phone) {
      let data = {
        'phone': this.login.phone
      }
      this.signUpService.forgotPassword(data).subscribe(data => {
        this.forgotPasswordResponse = data;
        if (this.forgotPasswordResponse.status) {
          this.checkOtpScreen = true;
          this.toastr.success('', 'OTP sent successfully');
        } else {
          this.errorMessage = this.forgotPasswordResponse.message;
        }
      }, err => {
        console.log(err);
      })
    }

  }

  submitOtp() {
    this.errorMessage = null;
    if (this.forgotPasswordResponse.otp == this.otp) {
      this.resetPasswordScreen = true;
    } else {
      this.errorMessage = "OTP didn't match"
    }
  }

  setNewPassword(newPasswd) {
    this.errorMessage = null;
    console.log(newPasswd, this.validPassword);

    if (newPasswd && this.validPassword) {
      let data = {
        phone: this.login.phone,
        password: newPasswd
      }

      this.signUpService.resetPassword(data).subscribe(data => {
        console.log(data)
        this.newPasswordResponse = data;
        if (this.newPasswordResponse.status) {
          this.toastr.success('', 'Reset Password Success');
        } else {
          this.errorMessage = "Error while setting new password";
        }
      }, err => {
        this.errorMessage = "Error while setting new password"
        console.log(err);
      })
    }

  }

}
