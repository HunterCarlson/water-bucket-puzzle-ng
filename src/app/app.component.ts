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

  solved = false;

  public fill3() {
    this.bucket3 = 3;
    this.makeMove();
  }

  public fill5() {
    this.bucket5 = 5;
    this.makeMove();
  }

  public empty3() {
    this.bucket3 = 0;
    this.makeMove();
  }

  public empty5() {
    this.bucket5 = 0;
    this.makeMove();
  }

  public pour3() {
    const emptySpace5 = 5 - this.bucket5;
    if (emptySpace5 === 0) {
    } else {
      let transfer = 0;
      if (emptySpace5 < this.bucket3) {
        transfer = emptySpace5;
      } else {
        transfer = this.bucket3;
      }
      this.bucket5 = this.bucket5 + transfer;
      this.bucket3 = this.bucket3 - transfer;
    }
    this.makeMove();
  }

  public pour5() {
    const emptySpace3 = 3 - this.bucket3;
    if (emptySpace3 === 0) {
    } else {
      let transfer = 0;
      if (emptySpace3 < this.bucket5) {
        transfer = emptySpace3;
      } else {
        transfer = this.bucket5;
      }
      this.bucket3 = this.bucket3 + transfer;
      this.bucket5 = this.bucket5 - transfer;
    }
    this.makeMove();
  }

  public makeMove() {
    this.moves++;
    this.checkSolved();
  }

  public reset() {
    this.solved = false;
    this.bucket3 = 0;
    this.bucket5 = 0;
    this.moves = 0;
  }

  public checkSolved() {
    if (this.bucket5 === 4) {
      this.solved = true;
    } else {
      this.solved = false;
    }
  }
}
