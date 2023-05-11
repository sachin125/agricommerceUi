import { Component, OnInit } from '@angular/core';
import { DataresolverService } from '../_httpservice/dataresolver.service';
import { HttpService } from '../_httpservice/http-service.service';
import { MenuinComponent } from '../_menu/menuin.component';

@Component({
  selector: 'rolebased-root',
  templateUrl: './rolebased.component.html',
  styleUrls: ['./rolebased.component.css']
})
export class RolebasedComponent{
  
  title = 'Agricommerce';

  contextRole:any;
  contextUser:any;

  constructor(private dataresolverService: DataresolverService) {
    
  }

  async getLoadedContextUser() {
    console.log('RolebasedComponent: DataresolverService.contextUser {}',DataresolverService.contextUser)
    if (DataresolverService.contextUser == null) {
      await this.getContextUser();
    }
  }

  async getContextUser() {
    let res = await this.dataresolverService.getContextUser1().pipe().toPromise();
      DataresolverService.contextUser = res;
      DataresolverService.contextRole = res.roles[0];
      console.log('RolebasedComponent: contextUser {}',DataresolverService.contextUser);
      console.log('RolebasedComponent: contextRole {}',DataresolverService.contextRole);  
 }

}
