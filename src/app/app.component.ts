import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "water-bucket-puzzle-ng";

  bucket3 = 0;
  bucket5 = 0;

  moves = 0;

  public fill3() {
    this.moves++;
    this.bucket3 = 3;
  }

  public fill5() {
    this.moves++;
    this.bucket5 = 5;
  }

  public empty3() {
    this.moves++;
    this.bucket3 = 0;
  }

  public empty5() {
    this.moves++;
    this.bucket5 = 0;
  }

  public pour3() {
    this.moves++;
    const emptySpace5 = 5 - this.bucket5;
    if (emptySpace5 === 0) {
      return;
    } else {
      let transfer = 0;
      if (emptySpace5 < this.bucket3) {
        transfer = emptySpace5;
      } else {
        transfer = this.bucket3;
      }
      this.bucket5 = this.bucket5 + transfer;
      this.bucket3 = this.bucket3 - transfer;
      return;
    }
  }

  public pour5() {
    this.moves++;
    const emptySpace3 = 3 - this.bucket3;
    if (emptySpace3 === 0) {
      return;
    } else {
      let transfer = 0;
      if (emptySpace3 < this.bucket5) {
        transfer = emptySpace3;
      } else {
        transfer = this.bucket5;
      }
      this.bucket3 = this.bucket3 + transfer;
      this.bucket5 = this.bucket5 - transfer;
      return;
    }
  }

  public reset() {
    this.bucket3 = 0;
    this.bucket5 = 0;
    this.moves = 0;
  }
}
