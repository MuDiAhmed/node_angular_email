import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-email-form",
  templateUrl: "./email-form.component.html",
  styleUrls: ["./email-form.component.sass"]
})
export class EmailFormComponent implements OnInit {
  private static url = "/api/email";
  emailFormControl = new FormGroup({
    toEmail: new FormControl("", [Validators.required, Validators.email]),
    fromEmail: new FormControl("", [Validators.required, Validators.email]),
    subject: new FormControl("", [Validators.required]),
    body: new FormControl("", [Validators.required])
  });
  error = null;
  loading = false;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  sendEmail() {
    console.log(this.emailFormControl.value);
    this.loading = !this.loading;
    this.http
      .post(EmailFormComponent.url, this.emailFormControl.value)
      .subscribe(
        response => {
          this.loading = !this.loading;
          this.emailFormControl.reset();
          this.snackBar.open(response.toString(), null, {
            duration: 2000
          });
        },
        error => {
          this.loading = !this.loading;
          this.emailFormControl.reset();
          this.error = error.message;
        }
      );
  }

  get toEmail() {
    return this.emailFormControl.get("toEmail");
  }

  get fromEmail() {
    return this.emailFormControl.get("fromEmail");
  }

  get subject() {
    return this.emailFormControl.get("subject");
  }

  get body() {
    return this.emailFormControl.get("body");
  }
}
