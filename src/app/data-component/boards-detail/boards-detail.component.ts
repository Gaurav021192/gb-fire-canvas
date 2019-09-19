import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FsService } from '../../shared/services/fs.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-boards-detail',
  templateUrl: './boards-detail.component.html',
  styleUrls: ['./boards-detail.component.css']
})
export class BoardsDetailComponent implements OnInit {

  board:any = {};
  isadmin: Boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private fs: FsService, 
    public authService: AuthService) { }

  public ngOnInit(): void {
    this.getBoardDetails(this.route.snapshot.params['id']);

    if(this.authService.isLoggedIn === true) {
      this.authService.getUser().subscribe(res => {
        // console.log(JSON.stringify(res) + ' ' + isNullOrUndefined(res.roles.admin));
        this.isadmin = (isNullOrUndefined(res.roles.admin) ? false : res.roles.admin);
      });
    }    
  }

  public getBoardDetails(id: any): void {
    this.fs.getBoard(id)
      .subscribe(data => {
        // console.log(data);
        this.board = data;
      });
  }

  public deleteBoard(id: any): void {
    this.fs.deleteBoards(id)
      .subscribe(res => {
          this.router.navigate(['/boards']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
