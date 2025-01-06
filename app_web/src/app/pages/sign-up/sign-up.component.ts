import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createUser } from '../../api/userApi';
import { UserDto } from '../../types/userDto';
import { UserService } from '../../services/user/user.service';
import { ArtistService } from '../../services/artist/artist.service';
import { getArtists } from '../../api/artistApi';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  name !: string
  email !: string
  password !: string
  date !: Date
  hiddens = [true, true, true, true]

  constructor(
    private router: Router,
    private userService: UserService,
    private artistsService : ArtistService
  ){}

  signUp(){
    if(this.name){
      this.hiddens[0] = true
      if(this.email.includes('@') && this.email.includes('.')){
        this.hiddens[1] = true
        if(new Date() > new Date(this.date)){
          this.hiddens[2] = true
          if(this.password.length > 5){
            this.hiddens[3] = true
            // console.log(this.email, this.password, this.name, this.date);
            const use : UserDto ={
              name:this.name,
              email:this.email,
              password:this.password,
              dateofbirth: new Date(this.date)
            }
            console.log(use);
            
            createUser(use).then((res)=>{
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
          } else this.hiddens[3] = false
        }else this.hiddens[2] = false
      }else this.hiddens[1] = false
    }else this.hiddens[0] = false
  }
}
