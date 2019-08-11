import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../providers/globalVars';

declare var andJS: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  // globalVar.aryDevices =[];

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, private toastCtrl: ToastController, private globalVar: GlobalVars,) {
    //this.reloadDevices();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'button'
    });

    toast.present();
  }

  saveDevice(sn)
  {
    var tempDev = null;
    for(var i =0 ; i < this.globalVar.aryDevices.length; i++ )
    {
      if(sn == this.globalVar.aryDevices[i]['sn'])
      {
        tempDev = this.globalVar.aryDevices[i];
        break;
      }
    }
    if(tempDev != null)
    {
      // tempDev['updateDate'] = new Date().Format('yyyy-MM-dd hh:mm');
      tempDev['updateDate'] = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm');

      //test
      //console.log(tempDev['updateDate']);

      tempDev['savePath'] = '/AnweifeHT' + '/' + tempDev['sn'] + '_' + tempDev['name'] ;

      var aryTempDevs = andJS.getDevices();
      for(var i = 0 ; i < aryTempDevs.length; i++ )
      {
        if(sn == aryTempDevs[i]['sn'])
        {
          aryTempDevs[i] = tempDev;
          break;
        }
      }
      andJS.updateDevices(aryTempDevs);

      this.presentToast(tempDev['name'] + ' ' +this.globalVar.lang.saved);
      // this.reloadDevices();
      this.globalVar.filterDevices();
    }   
  }

  delDevice(sn, name)
  {
    var aryTempDevs = andJS.getDevices();
    var removeIdx = -1;
    for(var i = 0 ; i < aryTempDevs.length; i++ )
    {
      if(sn == aryTempDevs[i]['sn'])
      {
        removeIdx = i;
        break;
      }
    }
    if(removeIdx != -1)
    {
      aryTempDevs.splice(removeIdx,1);
    }
    andJS.updateDevices(aryTempDevs);
    this.presentToast(name + ' ' + this.globalVar.lang.deleted);
    // this.reloadDevices();
    this.globalVar.filterDevices();
  } 

  addNew(name, mac)
  {
    var sn = andJS.getSN();

    var tempDev = {};
    tempDev['sn'] = sn;
    tempDev['name'] = name;
    tempDev['mac'] = mac;
    tempDev['saveRate'] = '1';
    tempDev['savePath'] = '/AnweifeHT' + '/' + sn + '_' + name ;
    tempDev['groupId'] = this.globalVar.groupFilterId;
    tempDev['areaId'] = this.globalVar.areaFilterId;
    tempDev['updateDate'] = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm');

    this.globalVar.aryDevices.push(tempDev);

    var aryTempDevs = andJS.getDevices();
    aryTempDevs.push(tempDev);
    andJS.updateDevices(aryTempDevs);

    this.presentToast( this.globalVar.lang.add_new_device + ' :' + name);
  }

  getSaveRateDispaly(index)
  {
    if(index == 1)
    {
      return '5 min';
    }else if(index == 2){
      return '15 min';
    }else if(index == 3){
      return '45 min';
    }else if(index == 4){
      return '1 H';
    }else if(index == 5){
      return '2 H';
    }else if(index == 6){
      return '4 H';
    }else if(index == 7){
      return '8 H';
    }else if(index == 8){
      return '12 H';
    }else if(index == 9){
      return '24 H';
    }
  }

  showDeleteConfirm(sn, name) {
    const confirm = this.alertCtrl.create({
      title: this.globalVar.lang.delete,
      message: this.globalVar.lang.delete_device + ': ' +  name + ' ?',
      buttons: [
        {
          text: this.globalVar.lang.ok,
          handler: () => {
            this.delDevice(sn, name);
          }
        },
        {
          text: this.globalVar.lang.cancel,
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showAddDialog() {
    let alert = this.alertCtrl.create({
      title: this.globalVar.lang.new,
      message: this.globalVar.lang.add_new_device,
      inputs: [
        {
          name: 'name',
          placeholder: this.globalVar.lang.device_name
        },
        {
          name: 'mac',
          placeholder: 'mac address'
        },
      ],
      buttons: [
        {
          text: this.globalVar.lang.save,
          handler: data => {
            this.addNew(data.name, data.mac);
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


  formatDate (date, fmt) { 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

}
