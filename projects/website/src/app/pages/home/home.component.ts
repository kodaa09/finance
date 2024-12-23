import { Component } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";

@Component({
  selector: 'app-home',
  imports: [AuthFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
