import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {
      constructor(public authService:AuthentificationService , public router : Router){

      }
  ngOnInit(): void {
   
  }

  handelLogout(){
    this.authService.logout().subscribe({
        next :(data)=>{
            this.router.navigateByUrl("/login");
        }
    });
  }
}
