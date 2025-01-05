import { Component, ElementRef, ViewChild } from '@angular/core';
import { Artist, User } from '../../types';
import { ArtistService } from '../../services/artist/artist.service';
import { artistRatings } from '../../api/ratingApi';
import { UserService } from '../../services/user/user.service';
import { ArtistDto } from '../../types/artistDto';
import { FormsModule } from '@angular/forms';
import { uploadToCloudinary } from '../../api';
import { createArtist, deleteArtist, getArtists, updateArtist } from '../../api/artistApi';
import { empty } from 'rxjs';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css',
})
export class ArtistsComponent {
  @ViewChild('cancel') cancel!: ElementRef;
  @ViewChild('logForm') logForm!: ElementRef;
  @ViewChild('closeMode2') closeMode2!: ElementRef;

  action = false
  hidden = true

  artists: Artist[] = [];
  user!: User;
  hiddens = [true, true, true, true];

  message = '';

  emptyArtistDto: ArtistDto = {
    image: '',
    name: '',
    stageName: '',
    numOfAlbums: 0,
    recordLabel: '',
    publishingHouse: '',
    startDate: new Date(),
    mediaLinks: [],
  };

  emptyArtist: Artist = {
    id: '',
    image: '',
    name: '',
    stageName: '',
    numOfAlbums: 0,
    rate: undefined,
    ratings: [],
    mediaLinks: [],
    recordLabel: '',
    publishingHouse: '',
    startDate: new Date(),
    followers: [],
    followerIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  artistIndex!: number;

  updating = false;
  deletingName = '';
  deletingId = '';

  constructor(
    private artistsService: ArtistService,
    private userService: UserService
  ) {
    userService.user$.subscribe((res) => {
      this.user = res;
      artistsService.artists$.subscribe((res) => {
        this.artists = res;
        res.forEach((artist, num) => {
          console.log(artist);

          artist.rate = 0;
          if(artist.ratings.length > 0){
            for (const i of artist.ratings) {
              artist.rate += i.rate;
            }
            const val = Math.floor(artist.rate / artist.ratings.length);
            artist.rate = val == 0 ? 1 : val;
          }
        });
        // artistsService.setArtists(this.artists)
      });
    });
  }

  ngOnInit() {}

  setEmptyArtistDto(){
    if(!this.updating)
      this.emptyArtistDto = {
        image: '',
        name: '',
        stageName: '',
        numOfAlbums: 0,
        recordLabel: '',
        publishingHouse: '',
        startDate: new Date(),
        mediaLinks: [],
      }
  }

  openFileExplorer(fileType: 'image' | 'video') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = fileType === 'image' ? 'image/*' : 'video/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      uploadToCloudinary(file, 'image').then((url) => {
        if (url) {
          this.emptyArtistDto.image = url;
          this.message = 'Image uploaded';
          this.action = true
          this.hidden = false
        } else {
          this.message = 'Image uploaded Failed';
          this.action = false
          this.hidden = false
        }
        setTimeout(() => {
          this.hidden = true
        }, 1500);
      });
      console.log(this.emptyArtistDto.image);
      // Handle file here
    };

    input.click();
  }

  submit() {
    console.log(this.emptyArtistDto);
    if (new Date(this.emptyArtistDto.startDate) <= new Date()) {
      if (
        this.emptyArtistDto.name != '' &&
        // this.emptyArtistDto.image != '' &&
        this.emptyArtistDto.stageName != '' &&
        this.emptyArtistDto.recordLabel != '' &&
        this.emptyArtistDto.publishingHouse != '' &&
        this.emptyArtistDto.numOfAlbums != 0 &&
        this.emptyArtistDto.mediaLinks.length != 0
      ) {
        if (!this.updating) {
          this.emptyArtistDto.startDate = new Date(this.emptyArtistDto.startDate);
          createArtist(this.emptyArtistDto, this.user.jwt || '').then((res) => {
            if (res) {
              this.artists.push(res);
              this.cancel.nativeElement.click()
              this.artistsService.setArtists(this.artists);
            }
          });
        } else if (this.updating && this.artistIndex >= 0) {
          this.emptyArtistDto.startDate = new Date(this.emptyArtistDto.startDate)
          this.artists[this.artistIndex] = {
            id: this.artists[this.artistIndex].id,
            ...this.emptyArtistDto,
            followerIds: this.artists[this.artistIndex].followerIds,
            followers: this.artists[this.artistIndex].followers,
            ratings: this.artists[this.artistIndex].ratings,
            createdAt: this.artists[this.artistIndex].createdAt,
            updatedAt: this.artists[this.artistIndex].updatedAt,
          };
          console.log(this.artists[this.artistIndex]);
          
          updateArtist(
            this.artists[this.artistIndex].id,
            this.artists[this.artistIndex],
            this.user.jwt || ''
          ).then((res) => {
            if (res) {
              getArtists(this.user.jwt || '').then((val) => {
                if (val) {
                  this.artistsService.setArtists(val);
                  this.updating = false;
                  this.cancel.nativeElement.click()
                }
              });
            }
          });
        }
      }
    }
  }

  newFunc(){
    this.updating = false;
    this.logForm.nativeElement.click();
  }

  update(num : number) {
    this.artistIndex = num
    if (this.artistIndex >= 0) {
      this.updating = true;
      this.emptyArtistDto = {
        ...this.artists[this.artistIndex],
      };
      this.logForm.nativeElement.click();
    }
  }

  deleteTalent(id ?: string, name ?: string) {
    if(name && id) {
      this.deletingName = name
      this.deletingId = id
    }
    else{
      deleteArtist(this.deletingId, this.user.jwt || '').then((res) => {
        if(res){
          getArtists(this.user.jwt || '').then((val) => {
            if (val) {
              this.artistsService.setArtists(val);
              this.closeMode2.nativeElement.click()
            }
          });
        }
      })
    }
  }
}
