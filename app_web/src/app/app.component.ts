import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Artist } from './types';
import { ArtistService } from './services/artist/artist.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app_web';
}
