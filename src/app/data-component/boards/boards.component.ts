import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../../shared/services/fs.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { isNullOrUndefined, isUndefined } from 'util';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  displayedColumns = ['title', 'description', 'author'];
  dataSource = new BoardDataSource(this.fs);
  isadmin: Boolean = false;

  constructor(private fs: FsService,
    public authService: AuthService) {
  }

  public ngOnInit():void {

    if(this.authService.isLoggedIn === true) {
      this.authService.getUser().subscribe(res => {
        // console.log(JSON.stringify(res) + ' ' + isNullOrUndefined(res.roles.admin));
        this.isadmin = (isNullOrUndefined(res.roles.admin) ? false : res.roles.admin);
      });
    }    
  }
}

export class BoardDataSource extends DataSource<any> {

  constructor(private fs: FsService) {
    super()
  }

  connect() {
    return this.fs.getBoards();
  }

  disconnect() {
  }
}
