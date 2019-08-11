import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { GlobalVars } from '../providers/globalVars';

import { AlertController } from 'ionic-angular';

declare var andJS: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public alertCtrl: AlertController, public globalVar: GlobalVars,) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.reloadMeunData();
  }

  updateGroupsByKey(ev)
  {
    this.globalVar.groups = this.getAreaGroupMenu();

    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.globalVar.groups = this.globalVar.groups.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
  }

  getAreaGroupMenu()
  {
      var aryGroups = [];

      //All item button
      var allItemBtn = 
      {
        'isGroup': 0,
        'name': this.globalVar.lang.all,
        'type':'all',
        'isDel': 0,
      };
      aryGroups.push(allItemBtn);

      for(var i = 0; i<this.globalVar.areaGroups.length;i++)
      {

          var itemArea = this.globalVar.areaGroups[i];
          itemArea['isGroup'] = 0 ;
          if(!this.globalVar.areaGroups[i].list || this.globalVar.areaGroups[i].list.length == 0)
          {
            itemArea['isDel'] = 1 ;
          }else
          {
            itemArea['isDel'] = 0 ;
          }
          aryGroups.push(itemArea);
          
          if( this.globalVar.areaGroups[i].list )
          {
              for(var k = 0; k < this.globalVar.areaGroups[i].list.length ; k++)
              {
                  var itemGroup = this.globalVar.areaGroups[i].list[k];
                  itemGroup['isGroup'] = 1 ;

                  var isDel = 1;
                  var aryStatus = andJS.getDevices();
                  aryStatus.forEach(function(e){
                    if(e.groupId == itemGroup.sn)
                      isDel = 0;
                  });
                  itemGroup['isDel'] = isDel ;

                  aryGroups.push(itemGroup);
              }
          }

          var AddGroupItemBtn = 
          {
            'areaSn': this.globalVar.areaGroups[i].sn,
            'isGroup': 1,
            'name': '',
            'addGroup':1,
            'isDel': 0,
            'type': 'addGroup',
          }
          aryGroups.push(AddGroupItemBtn);
      }

      var AddAreaItemBtn = 
      {
        'isGroup': 0,
        'name': '',
        'addArea':1,
        'isDel': 0,
        'type': 'addArea',
      };
      aryGroups.push(AddAreaItemBtn);

      return aryGroups;
  }

  selectGroup(item)
  {
    if(item.type == 'area')
    {
      this.globalVar.areaFilterId = item.sn;
      this.globalVar.groupFilterId = -1;
    }else if(item.type == 'group')
    {
      this.globalVar.areaFilterId = item.areaId;
      this.globalVar.groupFilterId = item.sn;
    }else
    {
      this.globalVar.areaFilterId = -1;
      this.globalVar.groupFilterId = -1;
    }
    this.globalVar.filterDevices();
  }

  delAreaGroup(item)
  {
    //console.log(item);

    var tempAG = andJS.getAreaGroup();
    
    for(var i=0; i< tempAG.length ; i++)
    {
      if(tempAG[i].sn ==  item.sn)
      {
        tempAG.splice(i,1);
        break;
      }
      if( tempAG[i].list )
      {
        for(var k = 0; k < tempAG[i].list.length ; k++)
        {
          if(tempAG[i].list[k].sn ==  item.sn)
          {
            tempAG[i].list.splice(k,1);
            break;
          }
        }
      }
    }

    andJS.updateAreaGroup(tempAG);
    this.reloadMeunData();
  }

  showAddAreaDialog()
  {
    let alert = this.alertCtrl.create({
      title: this.globalVar.lang.new_area,
      message: this.globalVar.lang.add_new_area,
      inputs: [
        {
          name: 'name',
          placeholder: this.globalVar.lang.area_name,
        }
      ],
      buttons: [
        {
          text: this.globalVar.lang.save,
          handler: data => {
            this.addNewArea(data.name);
            this.reloadMeunData();
          }
        },
        {
          text: this.globalVar.lang.cancel,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    alert.present();
  }

  addNewArea(name)
  {
    var tempAG = andJS.getAreaGroup();
    var newArea = 
    {
      'sn': andJS.getSN(),
      'type': 'area',
      'name': name
    }
    tempAG.push(newArea);
    andJS.updateAreaGroup(tempAG);
    this.getAreaGroupMenu();
  }

  showAddGroupDialog(areaSn)
  {

    let alert = this.alertCtrl.create({
      title: this.globalVar.lang.new_group,
      message: this.globalVar.lang.add_new_group,
      inputs: [
        {
          name: 'name',
          placeholder: this.globalVar.lang.group_name
        }
      ],
      buttons: [
        {
          text: this.globalVar.lang.save,
          handler: data => {
            this.addNewGroup(data.name, areaSn);
            this.reloadMeunData();
          }
        },
        {
          text: this.globalVar.lang.cancel,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    alert.present();
  }

  addNewGroup(name, areaSn)
  {
    var tempAG = andJS.getAreaGroup();
    var newGroup = 
    {
      'sn': andJS.getSN(),
      'type': 'group',
      'name': name,
      'areaId': areaSn
    }
    
    for(var i = 0; i< tempAG.length ; i++)
    {
      if(tempAG[i].sn == areaSn)
      {
        if(!tempAG[i].list)
          tempAG[i].list = [];
        tempAG[i].list.push(newGroup);
      }
    }

    andJS.updateAreaGroup(tempAG);
    this.getAreaGroupMenu();
  }


  reloadMeunData()
  {
      this.globalVar.areaGroups = andJS.getAreaGroup();
      this.globalVar.groups = this.getAreaGroupMenu();
  }

}
