import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../providers/globalVars';
declare var andJS: any;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  aryUsers = [];

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, private toastCtrl: ToastController, private globalVar: GlobalVars, ) {
    this.aryUsers = andJS.getUsers();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'button'
    });

    toast.present();
  }

  saveUser(sn, username, password)
  {
    var aryTempUsers = andJS.getUsers();
    for(var i = 0 ; i < aryTempUsers.length; i++ )
    {
      if(sn == aryTempUsers[i]['sn'])
      {
        aryTempUsers[i]['username'] = username;
        aryTempUsers[i]['password'] = password;
        break;
      }
    }

    andJS.updateUsers(aryTempUsers);
    this.presentToast(username + ' ' +this.globalVar.lang.saved);
    this.aryUsers = this.filterUsers();
  }

  delUser(sn, username)
  {
    var aryTempUsers = andJS.getUsers();
    var removeIdx = -1;
    for(var i = 0 ; i < aryTempUsers.length; i++ )
    {
      if(sn == aryTempUsers[i]['sn'])
      {
        removeIdx = i;
        break;
      }
    }
    if(removeIdx != -1)
    {
      aryTempUsers.splice(removeIdx,1);
    }
    andJS.updateUsers(aryTempUsers);
    this.presentToast(username + ' ' + this.globalVar.lang.deleted );
    this.aryUsers = this.filterUsers();
  }

  showDeleteConfirm(sn, username) {

    if(username.toLowerCase() == 'admin')
    {
      this.presentToast(this.globalVar.lang.admin_account_cant_be_deleted );
      return ;
    }

    const confirm = this.alertCtrl.create({
      title: this.globalVar.lang.delete ,
      message: this.globalVar.lang.delete_user + ' ' +  username + ' ?',
      buttons: [
        {
          text: this.globalVar.lang.ok,
          handler: () => {
            this.delUser(sn,username);
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

  addNew(username, password)
  {
    var sn = andJS.getSN();

    var tempUser = {};
    tempUser['sn'] = sn;
    tempUser['username'] = username;
    tempUser['password'] = password;

    var aryUsers = andJS.getUsers();
    for(var i = 0; i< aryUsers.length ; i++)
    {
      if(aryUsers[i]['username'].toLowerCase() == tempUser['username'].toLowerCase())
      {
        this.presentToast( this.globalVar.lang.user_name_is_alreay_exist +' :' + username);
        return;
      }
    }
    aryUsers.push(tempUser);
    andJS.updateUsers(aryUsers);

    this.presentToast( this.globalVar.lang.add_new_user + ': ' + username);
    // this.aryUsers = andJS.getUsers();
    this.aryUsers = this.filterUsers();
  }

  showAddDialog() {
    let alert = this.alertCtrl.create({
      title: this.globalVar.lang.new,
      message: this.globalVar.lang.add_new_user,
      inputs: [
        {
          name: 'username',
          placeholder: this.globalVar.lang.username,
        },
        {
          name: 'password',
          placeholder: this.globalVar.lang.password,
          type: 'password'

        },
      ],
      buttons: [
        {
          text: this.globalVar.lang.save,
          handler: data => {
            this.addNew(data.username, data.password);
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

  filterUsers()
  {

    return andJS.getUsers();
    /*

    var currUser = andJS.getCurrUser();
    if(currUser == 'admin' || currUser == 'Admin')
    {
      return andJS.getUsers();
    }else{
      var aryUsers = andJS.getUsers();
      var aryNew = [];
      for(var i = 0; i < aryUsers.length ; i++)
      {
        if(aryUsers[i].username == currUser)
        {
          aryNew.push(aryUsers[i]);
          break;
        }
      }
      
    }

    return aryNew;
    */
  }

  isUserOrAdmin(username)
  {
    var currUser = andJS.getCurrUser();
    if(currUser == 'admin' || currUser == 'Admin')
    {
      return true;
    }else if(currUser == username ){
      return true;
    }

    return false;
  }

  isAdmin()
  {
    var currUser = andJS.getCurrUser();
    if(currUser == 'admin' || currUser == 'Admin')
    {
      return true;
    }else{
      return false;
    }
  }

}
