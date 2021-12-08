import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('slider')  slider: IonSlides;

  public viewEntered = false;
  public sliderOpts = null;

  constructor(public router: Router) {}

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ngOnInit() {
    this.sliderOpts ={
      effect: 'slide',
      initialSlide: 0,
    };










  }
  clickLoginButton(){
    this.router.navigate(['login']);

  }
}
