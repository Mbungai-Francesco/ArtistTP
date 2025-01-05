import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { loginUser } from '../../api/userApi';
import { UserService } from '../../services/user/user.service';
import { ArtistService } from '../../services/artist/artist.service';
import { getArtists } from '../../api/artistApi';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email !: string
  password !: string
  hiddens = [true, true]

  constructor(
    private router: Router,
    private userService : UserService,
    private artistsService : ArtistService
  ){}

  login(){
    if(this.email.includes('@') && this.email.includes('.')){
      this.hiddens[0] = true
      if(this.password.length != 0){
        this.hiddens[1] = true
        console.log(this.email, this.password);
        loginUser(this.email, this.password).then((res)=>{
          if(res){
            this.userService.setUser(res)
            getArtists(res.jwt || '').then((val)=>{
              if(val){
                this.artistsService.setArtists(val)
              }
            })
            this.router.navigate(['/artists']); // Navigate to the desired route
          }
        })
      } else this.hiddens[1] = false
    }else this.hiddens[0] = false
  }

}
