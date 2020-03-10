import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators, FormGroup, FormArray } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatChipInputEvent, MatChipList } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-email-form",
  templateUrl: "./email-form.component.html",
  styleUrls: ["./email-form.component.sass"]
})
export class EmailFormComponent implements OnInit {
  private static url = "/api/email";
  @ViewChild("toEmailList") toEmailList: MatChipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emailFormControl = new FormGroup({
    toEmail: new FormArray([], [Validators.required]),
    fromEmail: new FormControl("", [Validators.required, Validators.email]),
    subject: new FormControl("", [Validators.required]),
    body: new FormControl("", [Validators.required])
  });
  error = null;
  loading = false;
  toEmails = [];
  toEmailsFormController = this.emailFormControl.get("toEmail") as FormArray;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.toEmailsFormController.statusChanges.subscribe(status => {
      if (this.toEmailList) {
        if (status === "INVALID") {
          this.toEmailList.errorState = true;
        } else if (status === "VALID") {
          this.toEmailList.errorState = false;
        }
      }
    });
  }

  sendEmail() {
    console.log(this.emailFormControl.value);
    this.loading = !this.loading;
    this.http
      .post(EmailFormComponent.url, this.emailFormControl.value)
      .subscribe(
        (response: { messageId: string }) => {
          this.loading = !this.loading;
          this.emailFormControl.reset();
          this.toEmails = [];
          this.snackBar.open(
            `Message has been sent with id: ${response.messageId}`,
            null,
            {
              duration: 4000,
              verticalPosition: "top"
            }
          );
        },
        error => {
          this.loading = !this.loading;
          this.emailFormControl.reset();
          this.error = error.message;
          this.toEmails = [];
        }
      );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (!value && this.toEmailsFormController.controls.length === 0) {
      this.toEmailsFormController.setErrors({ required: true });
    }

    if (value.trim()) {
      this.toEmails.push(value.trim());
      let control = new FormControl(value, [
        Validators.required,
        Validators.email
      ]);
      this.toEmailsFormController.push(control);
    }

    if (input) {
      input.value = "";
    }
  }

  remove(email: string): void {
    const index = this.toEmails.indexOf(email);

    if (index >= 0) {
      this.toEmails.splice(index, 1);
      this.toEmailsFormController.removeAt(index);
    }
  }

  get toEmail() {
    return this.emailFormControl.get("toEmail") as FormArray;
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
