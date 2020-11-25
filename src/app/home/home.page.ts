import { Component, OnInit } from "@angular/core";
import { cfaSignIn } from "capacitor-firebase-auth";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor() {}
  ngOnInit() {
    cfaSignIn("google.com").subscribe((user) => {
      console.log(user.displayName);
    });
  }
}
