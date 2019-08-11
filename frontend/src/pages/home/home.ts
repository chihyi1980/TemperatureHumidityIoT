import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { GlobalVars } from '../../providers/globalVars';
import { DetailPage } from '../../pages/detail/detail';

declare var andJS: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  aryCurrStatus = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private globalVar: GlobalVars,) {
    this.reloadStatusTask();
  }
  
  
  reloadStatusTask()
  {
    let self = this;
    setInterval(function(){
      self.aryCurrStatus = andJS.getCurrStatus();
      self.aryCurrStatus = self.aryCurrStatus.filter((status) => {
        if(self.globalVar.areaFilterId == -1 && self.globalVar.groupFilterId == -1)
          return true;
        
        if(self.globalVar.areaFilterId != -1 && status.areaId == self.globalVar.areaFilterId )
        {
          return true;
        }else if(self.globalVar.groupFilterId != -1 && status.groupId == self.globalVar.groupFilterId )
        {
          return true;
        }
      });
    },1000);

  }

  openDetail( sn ) {
    this.navCtrl.push(DetailPage, sn);
  }


}
