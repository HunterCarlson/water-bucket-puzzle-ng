import { Component } from "@angular/core";
import { timer, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "water-bucket-puzzle-ng";

  bucket3 = 0;
  bucket5 = 0;

  solved = false;
  failed = false;

  secondsRemaining = 5 * 60;
  timerRunning = false;
  timerDisplay = "5:00";

  tickSource = timer(1000, 1000);
  tickSubscription: Subscription;

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
    if (!this.timerRunning) {
      this.startTimer();
    }
    this.checkSolved();
  }

  public reset() {
    this.solved = false;
    this.failed = false;
    this.bucket3 = 0;
    this.bucket5 = 0;
    this.stopTimer();
    this.secondsRemaining = 5 * 60;
    this.timerDisplay = "5:00";
  }

  public checkSolved() {
    if (this.bucket5 === 4) {
      this.solved = true;
      this.stopTimer();
    } else {
      this.solved = false;
    }
  }

  startTimer() {
    this.tickSubscription = this.tickSource.subscribe(() => {
      this.secondsRemaining--;
      const seconds = this.secondsRemaining % 60;
      const minutes = Math.floor(this.secondsRemaining / 60);
      let secondsStr = seconds.toString();
      if (secondsStr.length < 2) {
        secondsStr = "0" + secondsStr;
      }
      this.timerDisplay = `${minutes}:${secondsStr}`;
      if (this.secondsRemaining === 0) {
        this.failed = true;
        this.stopTimer();
      }
    });
    this.timerRunning = true;
  }

  stopTimer() {
    this.tickSubscription.unsubscribe();
    this.timerRunning = false;
  }
}
