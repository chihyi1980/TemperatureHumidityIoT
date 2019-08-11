webpackJsonp([0],{

/***/ 119:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_globalVars__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage(globalVar) {
        this.globalVar = globalVar;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage.prototype.isAdminUser = function () {
        var currUser = andJS.getCurrUser();
        if (currUser == 'admin' || currUser == 'Admin') {
            return true;
        }
        else {
            return false;
        }
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\code\inoic_test\myAppTab\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="{{ globalVar.lang.status }}" tabIcon="ios-thermometer"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="{{ globalVar.lang.devices }}" tabIcon="ios-calculator" *ngIf="isAdminUser()" ></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="{{ globalVar.lang.accounts }}" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\code\inoic_test\myAppTab\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_globalVars__["a" /* GlobalVars */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutPage = /** @class */ (function () {
    // globalVar.aryDevices =[];
    function AboutPage(navCtrl, alertCtrl, toastCtrl, globalVar) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.globalVar = globalVar;
        //this.reloadDevices();
    }
    AboutPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'button'
        });
        toast.present();
    };
    AboutPage.prototype.saveDevice = function (sn) {
        var tempDev = null;
        for (var i = 0; i < this.globalVar.aryDevices.length; i++) {
            if (sn == this.globalVar.aryDevices[i]['sn']) {
                tempDev = this.globalVar.aryDevices[i];
                break;
            }
        }
        if (tempDev != null) {
            // tempDev['updateDate'] = new Date().Format('yyyy-MM-dd hh:mm');
            tempDev['updateDate'] = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm');
            //test
            //console.log(tempDev['updateDate']);
            tempDev['savePath'] = '/AnweifeHT' + '/' + tempDev['sn'] + '_' + tempDev['name'];
            var aryTempDevs = andJS.getDevices();
            for (var i = 0; i < aryTempDevs.length; i++) {
                if (sn == aryTempDevs[i]['sn']) {
                    aryTempDevs[i] = tempDev;
                    break;
                }
            }
            andJS.updateDevices(aryTempDevs);
            this.presentToast(tempDev['name'] + ' ' + this.globalVar.lang.saved);
            // this.reloadDevices();
            this.globalVar.filterDevices();
        }
    };
    AboutPage.prototype.delDevice = function (sn, name) {
        var aryTempDevs = andJS.getDevices();
        var removeIdx = -1;
        for (var i = 0; i < aryTempDevs.length; i++) {
            if (sn == aryTempDevs[i]['sn']) {
                removeIdx = i;
                break;
            }
        }
        if (removeIdx != -1) {
            aryTempDevs.splice(removeIdx, 1);
        }
        andJS.updateDevices(aryTempDevs);
        this.presentToast(name + ' ' + this.globalVar.lang.deleted);
        // this.reloadDevices();
        this.globalVar.filterDevices();
    };
    AboutPage.prototype.addNew = function (name, mac) {
        var sn = andJS.getSN();
        var tempDev = {};
        tempDev['sn'] = sn;
        tempDev['name'] = name;
        tempDev['mac'] = mac;
        tempDev['saveRate'] = '1';
        tempDev['savePath'] = '/AnweifeHT' + '/' + sn + '_' + name;
        tempDev['groupId'] = this.globalVar.groupFilterId;
        tempDev['areaId'] = this.globalVar.areaFilterId;
        tempDev['updateDate'] = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm');
        this.globalVar.aryDevices.push(tempDev);
        var aryTempDevs = andJS.getDevices();
        aryTempDevs.push(tempDev);
        andJS.updateDevices(aryTempDevs);
        this.presentToast(this.globalVar.lang.add_new_device + ' :' + name);
    };
    AboutPage.prototype.getSaveRateDispaly = function (index) {
        if (index == 1) {
            return '5 min';
        }
        else if (index == 2) {
            return '15 min';
        }
        else if (index == 3) {
            return '45 min';
        }
        else if (index == 4) {
            return '1 H';
        }
        else if (index == 5) {
            return '2 H';
        }
        else if (index == 6) {
            return '4 H';
        }
        else if (index == 7) {
            return '8 H';
        }
        else if (index == 8) {
            return '12 H';
        }
        else if (index == 9) {
            return '24 H';
        }
    };
    AboutPage.prototype.showDeleteConfirm = function (sn, name) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.globalVar.lang.delete,
            message: this.globalVar.lang.delete_device + ': ' + name + ' ?',
            buttons: [
                {
                    text: this.globalVar.lang.ok,
                    handler: function () {
                        _this.delDevice(sn, name);
                    }
                },
                {
                    text: this.globalVar.lang.cancel,
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    AboutPage.prototype.showAddDialog = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.addNew(data.name, data.mac);
                    }
                },
                {
                    text: this.globalVar.lang.cancel,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    AboutPage.prototype.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\code\inoic_test\myAppTab\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{ globalVar.lang.devices }}\n    </ion-title>\n    <button ion-button right menuToggle>\n      <ion-icon name="search" ></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let item of globalVar.aryDevices" >\n    <ion-list>\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.sn }} </ion-label>\n        <ion-input type="text" readonly [(ngModel)]="item.sn" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.name }}</ion-label>\n        <ion-input type="text" [(ngModel)]="item.name" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.mac }}</ion-label>\n        <ion-input type="text" [(ngModel)]="item.mac" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.saveRate }}</ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-badge item-end>{{getSaveRateDispaly(item.saveRate)}}</ion-badge>\n        <ion-range min="1" max="9" step="1" snaps="true" [(ngModel)]="item.saveRate" >\n          <ion-icon range-left small color="primary" name="arrow-back"></ion-icon>\n          <ion-icon range-right color="primary" name="arrow-forward"></ion-icon>\n        </ion-range>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.savePath }}</ion-label>\n        <ion-input type="text" [(ngModel)]="item.savePath" readonly></ion-input>\n      </ion-item>\n      \n      <ion-row>\n        <ion-col>\n          <button ion-button full item-start (click)="saveDevice( item.sn )" >{{ globalVar.lang.save }}</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="light" full item-end (click)="showDeleteConfirm( item.sn, item.name )">{{ globalVar.lang.delete }}</button>\n        </ion-col>\n      </ion-row>\n\n    </ion-list>   \n  </ion-card>\n\n  <button ion-button outline item-end icon-start (click)="showAddDialog()" *ngIf="globalVar.groupFilterId > 0" >\n    <ion-icon name="add" outline></ion-icon>\n    {{ globalVar.lang.add_new_device }}\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"C:\code\inoic_test\myAppTab\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__["a" /* GlobalVars */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, alertCtrl, toastCtrl, globalVar) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.globalVar = globalVar;
        this.aryUsers = [];
        this.aryUsers = andJS.getUsers();
    }
    ContactPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'button'
        });
        toast.present();
    };
    ContactPage.prototype.saveUser = function (sn, username, password) {
        var aryTempUsers = andJS.getUsers();
        for (var i = 0; i < aryTempUsers.length; i++) {
            if (sn == aryTempUsers[i]['sn']) {
                aryTempUsers[i]['username'] = username;
                aryTempUsers[i]['password'] = password;
                break;
            }
        }
        andJS.updateUsers(aryTempUsers);
        this.presentToast(username + ' ' + this.globalVar.lang.saved);
        this.aryUsers = this.filterUsers();
    };
    ContactPage.prototype.delUser = function (sn, username) {
        var aryTempUsers = andJS.getUsers();
        var removeIdx = -1;
        for (var i = 0; i < aryTempUsers.length; i++) {
            if (sn == aryTempUsers[i]['sn']) {
                removeIdx = i;
                break;
            }
        }
        if (removeIdx != -1) {
            aryTempUsers.splice(removeIdx, 1);
        }
        andJS.updateUsers(aryTempUsers);
        this.presentToast(username + ' ' + this.globalVar.lang.deleted);
        this.aryUsers = this.filterUsers();
    };
    ContactPage.prototype.showDeleteConfirm = function (sn, username) {
        var _this = this;
        if (username.toLowerCase() == 'admin') {
            this.presentToast(this.globalVar.lang.admin_account_cant_be_deleted);
            return;
        }
        var confirm = this.alertCtrl.create({
            title: this.globalVar.lang.delete,
            message: this.globalVar.lang.delete_user + ' ' + username + ' ?',
            buttons: [
                {
                    text: this.globalVar.lang.ok,
                    handler: function () {
                        _this.delUser(sn, username);
                    }
                },
                {
                    text: this.globalVar.lang.cancel,
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    ContactPage.prototype.addNew = function (username, password) {
        var sn = andJS.getSN();
        var tempUser = {};
        tempUser['sn'] = sn;
        tempUser['username'] = username;
        tempUser['password'] = password;
        var aryUsers = andJS.getUsers();
        for (var i = 0; i < aryUsers.length; i++) {
            if (aryUsers[i]['username'].toLowerCase() == tempUser['username'].toLowerCase()) {
                this.presentToast(this.globalVar.lang.user_name_is_alreay_exist + ' :' + username);
                return;
            }
        }
        aryUsers.push(tempUser);
        andJS.updateUsers(aryUsers);
        this.presentToast(this.globalVar.lang.add_new_user + ': ' + username);
        // this.aryUsers = andJS.getUsers();
        this.aryUsers = this.filterUsers();
    };
    ContactPage.prototype.showAddDialog = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.addNew(data.username, data.password);
                    }
                },
                {
                    text: this.globalVar.lang.cancel,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    ContactPage.prototype.filterUsers = function () {
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
    };
    ContactPage.prototype.isUserOrAdmin = function (username) {
        var currUser = andJS.getCurrUser();
        if (currUser == 'admin' || currUser == 'Admin') {
            return true;
        }
        else if (currUser == username) {
            return true;
        }
        return false;
    };
    ContactPage.prototype.isAdmin = function () {
        var currUser = andJS.getCurrUser();
        if (currUser == 'admin' || currUser == 'Admin') {
            return true;
        }
        else {
            return false;
        }
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\code\inoic_test\myAppTab\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{ globalVar.lang.accounts }}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let item of aryUsers" >\n    <ion-list >\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.id }} </ion-label>\n        <ion-input type="text" [(ngModel)]="item.username" readonly></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary" >{{ globalVar.lang.password }}</ion-label>\n        <ion-input type="password" [(ngModel)]="item.password" [readonly]="!isUserOrAdmin( item.username )"  ></ion-input>\n      </ion-item>\n\n      <ion-row>\n        <ion-col>\n          <button ion-button full item-start (click)="saveUser( item.sn, item.username, item.password )" *ngIf="isUserOrAdmin( item.username )" >{{ globalVar.lang.save }}</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="light" full item-end (click)="showDeleteConfirm( item.sn, item.username )" *ngIf="isUserOrAdmin( item.username )" >{{ globalVar.lang.delete }}</button>\n        </ion-col>\n      </ion-row>\n\n    </ion-list>   \n  </ion-card>\n\n  <button ion-button outline item-end icon-start (click)="showAddDialog()" *ngIf="isAdmin()" >\n    <ion-icon name="add" outline></ion-icon>\n    {{ globalVar.lang.add_new_user }}\n  </button>'/*ion-inline-end:"C:\code\inoic_test\myAppTab\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__["a" /* GlobalVars */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_detail_detail__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, globalVar) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.globalVar = globalVar;
        this.aryCurrStatus = [];
        this.reloadStatusTask();
    }
    HomePage.prototype.reloadStatusTask = function () {
        var self = this;
        setInterval(function () {
            self.aryCurrStatus = andJS.getCurrStatus();
            self.aryCurrStatus = self.aryCurrStatus.filter(function (status) {
                if (self.globalVar.areaFilterId == -1 && self.globalVar.groupFilterId == -1)
                    return true;
                if (self.globalVar.areaFilterId != -1 && status.areaId == self.globalVar.areaFilterId) {
                    return true;
                }
                else if (self.globalVar.groupFilterId != -1 && status.groupId == self.globalVar.groupFilterId) {
                    return true;
                }
            });
        }, 1000);
    };
    HomePage.prototype.openDetail = function (sn) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_detail_detail__["a" /* DetailPage */], sn);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\code\inoic_test\myAppTab\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ globalVar.lang.status }}</ion-title>\n    <button ion-button right menuToggle>\n      <ion-icon name="search"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-card *ngFor="let item of aryCurrStatus" (click)="openDetail( { \'sn\':item.sn, \'name\': item.name } )" >\n    <ion-card-header>\n      <h2>{{ item.sn }} - {{ item.name }}</h2>\n      <p style="color: gray">\n        {{ globalVar.findAreaGroupName(item.areaId) }} > {{ globalVar.findAreaGroupName(item.groupId) }}\n      </p>\n    </ion-card-header>\n    <ion-card-content>\n    <ion-row>\n      <ion-col>\n        <ion-icon name="ios-thermometer-outline" item-start></ion-icon> {{ item.temperature }} °C\n      </ion-col>\n      <ion-col>\n        <ion-icon name="ios-water-outline" item-start></ion-icon> {{ item.humidity }} ％\n      </ion-col>\n    </ion-row>      \n    </ion-card-content>\n  </ion-card>    \n</ion-content>\n\n'/*ion-inline-end:"C:\code\inoic_test\myAppTab\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__["a" /* GlobalVars */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DetailPage = /** @class */ (function () {
    function DetailPage(navParams, globalVar) {
        this.globalVar = globalVar;
        this.currDev = {};
        this.logs = [];
        this.chartLabels = [];
        this.chartTemp = [];
        this.chartHumi = [];
        this.currDev = navParams.data;
        this.init();
    }
    DetailPage.prototype.ngAfterViewInit = function () {
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        var myChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__(this.ctx, {
            type: 'line',
            data: {
                labels: this.chartLabels,
                datasets: [
                    {
                        label: this.globalVar.lang.temperature + ' °C',
                        // label: ' °C',
                        data: this.chartTemp,
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        borderWidth: 0,
                        fill: false,
                    },
                    {
                        label: this.globalVar.lang.humidity + ' ％',
                        // label: ' ％',
                        data: this.chartHumi,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        borderWidth: 0,
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
            }
        });
    };
    DetailPage.prototype.init = function () {
        var data = andJS.getLast24HrRec(this.currDev['name']);
        for (var i = 23; i >= 0; i--) {
            var hour = new Date().getHours();
            var hourNew = (hour - i) >= 0 ? (hour - i) : 24 + (hour - i);
            var key = JSON.stringify(hourNew);
            var newKey = (key.length == 2) ? key : '0' + key;
            var aryRecInHour = data[newKey];
            if (aryRecInHour) {
                for (var k = 0; k < aryRecInHour.length; k++) {
                    this.logs.unshift(aryRecInHour[k]);
                }
            }
            this.chartLabels.push(key);
        }
        for (var u = 0; u < this.chartLabels.length; u++) {
            var key1 = this.chartLabels[u];
            var newKey1 = (key1.length == 2) ? key1 : '0' + key1;
            var aryRecInHour = data[newKey1];
            if (aryRecInHour && aryRecInHour.length > 0) {
                this.chartTemp.push(aryRecInHour[0]['temperature']);
                this.chartHumi.push(aryRecInHour[0]['humidity']);
            }
            else {
                this.chartTemp.push(null);
                this.chartHumi.push(null);
            }
        }
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\code\inoic_test\myAppTab\src\pages\detail\detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      {{ globalVar.lang.detail }}\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card >\n\n    <ion-card-header>\n\n      {{ currDev.sn }} - {{ currDev.name }}\n\n    </ion-card-header>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" >{{ globalVar.lang.chart }}</ion-label>\n\n    </ion-item>\n\n    <div style="width:75%;">\n\n      <canvas id="myChart"></canvas>\n\n    </div>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" >{{ globalVar.lang.logs }}</ion-label>\n\n    </ion-item>\n\n    <ion-card-content>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col >{{ globalVar.lang.date}}</ion-col>\n\n          <ion-col >{{ globalVar.lang.time }}</ion-col>\n\n          <ion-col >{{ globalVar.lang.temperature }}</ion-col>\n\n          <ion-col >{{ globalVar.lang.humidity }}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row *ngFor="let item of logs">\n\n          <ion-col > {{ item.date }}  </ion-col>\n\n          <ion-col > {{ item.time }}  </ion-col>\n\n          <ion-col > {{ item.temperature }} °C  </ion-col>\n\n          <ion-col >  {{ item.humidity }} ％  </ion-col>\n\n        </ion-row>\n\n\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\code\inoic_test\myAppTab\src\pages\detail\detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_globalVars__["a" /* GlobalVars */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVars; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalVars = /** @class */ (function () {
    function GlobalVars() {
        this.areaFilterId = -1;
        this.groupFilterId = -1;
        this.groups = [];
        this.areaGroups = [];
        this.aryDevices = [];
        this.lang = {
            'status': 'Status',
            'area': 'Area',
            'group': 'Group',
            'devices': 'Devices',
            'accounts': 'Accounts',
            'sn': 'SN',
            'name': 'Name',
            'saveRate': 'Save rate',
            'savePath': 'Save path',
            'mac': 'Mac',
            'save': 'Save',
            'delete': 'Delete',
            'id': 'ID',
            'password': 'Password',
            'add_new_user': 'Add New User',
            'add_new_device': 'Add New Device',
            'temperature': 'Temperature',
            'humidity': 'Humidity',
            'date': 'Date',
            'chart': 'last 24 hours chart',
            'detail': 'Detail',
            'logs': 'Logs',
            'time': 'Time',
            'search': 'Search',
            'all': 'All',
            'new': 'New',
            'device_name': 'Device Name',
            'new_area': 'New Area',
            'new_group': 'New Group',
            'add_new_area': 'Add New Area',
            'add_new_group': 'Add New Group',
            'area_name': 'Area Name',
            'group_name': 'Group Name',
            'cancel': 'Cancel',
            'delete_device': 'Delete device',
            'ok': 'OK',
            'saved': 'saved',
            'deleted': 'deleted',
            'save_user': 'Save User',
            'delete_user': 'Delete User',
            'username': 'User Name',
            'user_name_is_alreay_exist': 'User name is alreay exist',
            'admin_account_cant_be_deleted': 'Admin account can\'t be deleted ',
        };
        this.init();
        this.selectLang();
    }
    GlobalVars.prototype.init = function () {
        this.aryDevices = andJS.getDevices();
    };
    GlobalVars.prototype.selectLang = function () {
        var selLang = andJS.getLang();
        if (selLang == 'lang_en') {
            this.lang = lang_en;
        }
        else if (selLang == 'lang_tw') {
            this.lang = lang_tw;
        }
        else if (selLang == 'lang_cn') {
            this.lang = lang_cn;
        }
    };
    GlobalVars.prototype.filterDevices = function () {
        var _this = this;
        this.aryDevices = andJS.getDevices();
        this.aryDevices = this.aryDevices.filter(function (device) {
            if (_this.areaFilterId == -1 && _this.groupFilterId == -1)
                return true;
            if (_this.areaFilterId != -1 && device.areaId == _this.areaFilterId) {
                return true;
            }
            else if (_this.groupFilterId != -1 && device.groupId == _this.groupFilterId) {
                return true;
            }
        });
    };
    GlobalVars.prototype.findAreaGroupName = function (sn) {
        var tempAG = andJS.getAreaGroup();
        for (var i = 0; i < tempAG.length; i++) {
            if (tempAG[i].sn == sn) {
                return tempAG[i].name;
            }
            if (tempAG[i].list) {
                for (var k = 0; k < tempAG[i].list.length; k++) {
                    if (tempAG[i].list[k].sn == sn) {
                        return tempAG[i].list[k].name;
                    }
                }
            }
        }
        return '';
    };
    GlobalVars = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], GlobalVars);
    return GlobalVars;
}());

//# sourceMappingURL=globalVars.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(365);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_globalVars__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__["a" /* DetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__["a" /* DetailPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_globalVars__["a" /* GlobalVars */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_globalVars__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, globalVar) {
        this.alertCtrl = alertCtrl;
        this.globalVar = globalVar;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.reloadMeunData();
    }
    MyApp.prototype.updateGroupsByKey = function (ev) {
        this.globalVar.groups = this.getAreaGroupMenu();
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.globalVar.groups = this.globalVar.groups.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    MyApp.prototype.getAreaGroupMenu = function () {
        var aryGroups = [];
        //All item button
        var allItemBtn = {
            'isGroup': 0,
            'name': this.globalVar.lang.all,
            'type': 'all',
            'isDel': 0,
        };
        aryGroups.push(allItemBtn);
        for (var i = 0; i < this.globalVar.areaGroups.length; i++) {
            var itemArea = this.globalVar.areaGroups[i];
            itemArea['isGroup'] = 0;
            if (!this.globalVar.areaGroups[i].list || this.globalVar.areaGroups[i].list.length == 0) {
                itemArea['isDel'] = 1;
            }
            else {
                itemArea['isDel'] = 0;
            }
            aryGroups.push(itemArea);
            if (this.globalVar.areaGroups[i].list) {
                for (var k = 0; k < this.globalVar.areaGroups[i].list.length; k++) {
                    var itemGroup = this.globalVar.areaGroups[i].list[k];
                    itemGroup['isGroup'] = 1;
                    var isDel = 1;
                    var aryStatus = andJS.getDevices();
                    aryStatus.forEach(function (e) {
                        if (e.groupId == itemGroup.sn)
                            isDel = 0;
                    });
                    itemGroup['isDel'] = isDel;
                    aryGroups.push(itemGroup);
                }
            }
            var AddGroupItemBtn = {
                'areaSn': this.globalVar.areaGroups[i].sn,
                'isGroup': 1,
                'name': '',
                'addGroup': 1,
                'isDel': 0,
                'type': 'addGroup',
            };
            aryGroups.push(AddGroupItemBtn);
        }
        var AddAreaItemBtn = {
            'isGroup': 0,
            'name': '',
            'addArea': 1,
            'isDel': 0,
            'type': 'addArea',
        };
        aryGroups.push(AddAreaItemBtn);
        return aryGroups;
    };
    MyApp.prototype.selectGroup = function (item) {
        if (item.type == 'area') {
            this.globalVar.areaFilterId = item.sn;
            this.globalVar.groupFilterId = -1;
        }
        else if (item.type == 'group') {
            this.globalVar.areaFilterId = item.areaId;
            this.globalVar.groupFilterId = item.sn;
        }
        else {
            this.globalVar.areaFilterId = -1;
            this.globalVar.groupFilterId = -1;
        }
        this.globalVar.filterDevices();
    };
    MyApp.prototype.delAreaGroup = function (item) {
        //console.log(item);
        var tempAG = andJS.getAreaGroup();
        for (var i = 0; i < tempAG.length; i++) {
            if (tempAG[i].sn == item.sn) {
                tempAG.splice(i, 1);
                break;
            }
            if (tempAG[i].list) {
                for (var k = 0; k < tempAG[i].list.length; k++) {
                    if (tempAG[i].list[k].sn == item.sn) {
                        tempAG[i].list.splice(k, 1);
                        break;
                    }
                }
            }
        }
        andJS.updateAreaGroup(tempAG);
        this.reloadMeunData();
    };
    MyApp.prototype.showAddAreaDialog = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.addNewArea(data.name);
                        _this.reloadMeunData();
                    }
                },
                {
                    text: this.globalVar.lang.cancel,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.addNewArea = function (name) {
        var tempAG = andJS.getAreaGroup();
        var newArea = {
            'sn': andJS.getSN(),
            'type': 'area',
            'name': name
        };
        tempAG.push(newArea);
        andJS.updateAreaGroup(tempAG);
        this.getAreaGroupMenu();
    };
    MyApp.prototype.showAddGroupDialog = function (areaSn) {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.addNewGroup(data.name, areaSn);
                        _this.reloadMeunData();
                    }
                },
                {
                    text: this.globalVar.lang.cancel,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.addNewGroup = function (name, areaSn) {
        var tempAG = andJS.getAreaGroup();
        var newGroup = {
            'sn': andJS.getSN(),
            'type': 'group',
            'name': name,
            'areaId': areaSn
        };
        for (var i = 0; i < tempAG.length; i++) {
            if (tempAG[i].sn == areaSn) {
                if (!tempAG[i].list)
                    tempAG[i].list = [];
                tempAG[i].list.push(newGroup);
            }
        }
        andJS.updateAreaGroup(tempAG);
        this.getAreaGroupMenu();
    };
    MyApp.prototype.reloadMeunData = function () {
        this.globalVar.areaGroups = andJS.getAreaGroup();
        this.globalVar.groups = this.getAreaGroupMenu();
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\code\inoic_test\myAppTab\src\app\app.html"*/'  <ion-menu [content]="content" side="right">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>{{ globalVar.lang.area }} > {{ globalVar.lang.group }}</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-searchbar (ionInput)="updateGroupsByKey($event)" placeholder="{{ globalVar.lang.search }}" ></ion-searchbar>\n      <ion-list>\n        \n        <ion-item *ngFor="let item of globalVar.groups" (click)="selectGroup( item )" >\n          <ion-icon ios="ios-add-circle" md="md-add-circle" *ngIf="item.addArea" float-left (click)="showAddAreaDialog()" ></ion-icon>\n          <ion-icon ios="ios-arrow-round-forward" md="md-arrow-round-forward" *ngIf="item.isGroup" padding-left></ion-icon>\n          <ion-icon ios="ios-add-circle-outline" md="md-add-circle" *ngIf="item.addGroup" (click)="showAddGroupDialog( item.areaSn )"></ion-icon>\n          {{item.name}} \n          <ion-icon ios="ios-trash" md="md-trash" float-right (click)="delAreaGroup( item )" *ngIf="item.isDel" ></ion-icon>\n        </ion-item>\n\n      </ion-list>\n    </ion-content>\n  </ion-menu>\n  <ion-nav [root]="rootPage" #content></ion-nav>\n'/*ion-inline-end:"C:\code\inoic_test\myAppTab\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_globalVars__["a" /* GlobalVars */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 218,
	"./af.js": 218,
	"./ar": 219,
	"./ar-dz": 220,
	"./ar-dz.js": 220,
	"./ar-kw": 221,
	"./ar-kw.js": 221,
	"./ar-ly": 222,
	"./ar-ly.js": 222,
	"./ar-ma": 223,
	"./ar-ma.js": 223,
	"./ar-sa": 224,
	"./ar-sa.js": 224,
	"./ar-tn": 225,
	"./ar-tn.js": 225,
	"./ar.js": 219,
	"./az": 226,
	"./az.js": 226,
	"./be": 227,
	"./be.js": 227,
	"./bg": 228,
	"./bg.js": 228,
	"./bm": 229,
	"./bm.js": 229,
	"./bn": 230,
	"./bn.js": 230,
	"./bo": 231,
	"./bo.js": 231,
	"./br": 232,
	"./br.js": 232,
	"./bs": 233,
	"./bs.js": 233,
	"./ca": 234,
	"./ca.js": 234,
	"./cs": 235,
	"./cs.js": 235,
	"./cv": 236,
	"./cv.js": 236,
	"./cy": 237,
	"./cy.js": 237,
	"./da": 238,
	"./da.js": 238,
	"./de": 239,
	"./de-at": 240,
	"./de-at.js": 240,
	"./de-ch": 241,
	"./de-ch.js": 241,
	"./de.js": 239,
	"./dv": 242,
	"./dv.js": 242,
	"./el": 243,
	"./el.js": 243,
	"./en-au": 244,
	"./en-au.js": 244,
	"./en-ca": 245,
	"./en-ca.js": 245,
	"./en-gb": 246,
	"./en-gb.js": 246,
	"./en-ie": 247,
	"./en-ie.js": 247,
	"./en-il": 248,
	"./en-il.js": 248,
	"./en-nz": 249,
	"./en-nz.js": 249,
	"./eo": 250,
	"./eo.js": 250,
	"./es": 251,
	"./es-do": 252,
	"./es-do.js": 252,
	"./es-us": 253,
	"./es-us.js": 253,
	"./es.js": 251,
	"./et": 254,
	"./et.js": 254,
	"./eu": 255,
	"./eu.js": 255,
	"./fa": 256,
	"./fa.js": 256,
	"./fi": 257,
	"./fi.js": 257,
	"./fo": 258,
	"./fo.js": 258,
	"./fr": 259,
	"./fr-ca": 260,
	"./fr-ca.js": 260,
	"./fr-ch": 261,
	"./fr-ch.js": 261,
	"./fr.js": 259,
	"./fy": 262,
	"./fy.js": 262,
	"./gd": 263,
	"./gd.js": 263,
	"./gl": 264,
	"./gl.js": 264,
	"./gom-latn": 265,
	"./gom-latn.js": 265,
	"./gu": 266,
	"./gu.js": 266,
	"./he": 267,
	"./he.js": 267,
	"./hi": 268,
	"./hi.js": 268,
	"./hr": 269,
	"./hr.js": 269,
	"./hu": 270,
	"./hu.js": 270,
	"./hy-am": 271,
	"./hy-am.js": 271,
	"./id": 272,
	"./id.js": 272,
	"./is": 273,
	"./is.js": 273,
	"./it": 274,
	"./it.js": 274,
	"./ja": 275,
	"./ja.js": 275,
	"./jv": 276,
	"./jv.js": 276,
	"./ka": 277,
	"./ka.js": 277,
	"./kk": 278,
	"./kk.js": 278,
	"./km": 279,
	"./km.js": 279,
	"./kn": 280,
	"./kn.js": 280,
	"./ko": 281,
	"./ko.js": 281,
	"./ku": 282,
	"./ku.js": 282,
	"./ky": 283,
	"./ky.js": 283,
	"./lb": 284,
	"./lb.js": 284,
	"./lo": 285,
	"./lo.js": 285,
	"./lt": 286,
	"./lt.js": 286,
	"./lv": 287,
	"./lv.js": 287,
	"./me": 288,
	"./me.js": 288,
	"./mi": 289,
	"./mi.js": 289,
	"./mk": 290,
	"./mk.js": 290,
	"./ml": 291,
	"./ml.js": 291,
	"./mn": 292,
	"./mn.js": 292,
	"./mr": 293,
	"./mr.js": 293,
	"./ms": 294,
	"./ms-my": 295,
	"./ms-my.js": 295,
	"./ms.js": 294,
	"./mt": 296,
	"./mt.js": 296,
	"./my": 297,
	"./my.js": 297,
	"./nb": 298,
	"./nb.js": 298,
	"./ne": 299,
	"./ne.js": 299,
	"./nl": 300,
	"./nl-be": 301,
	"./nl-be.js": 301,
	"./nl.js": 300,
	"./nn": 302,
	"./nn.js": 302,
	"./pa-in": 303,
	"./pa-in.js": 303,
	"./pl": 304,
	"./pl.js": 304,
	"./pt": 305,
	"./pt-br": 306,
	"./pt-br.js": 306,
	"./pt.js": 305,
	"./ro": 307,
	"./ro.js": 307,
	"./ru": 308,
	"./ru.js": 308,
	"./sd": 309,
	"./sd.js": 309,
	"./se": 310,
	"./se.js": 310,
	"./si": 311,
	"./si.js": 311,
	"./sk": 312,
	"./sk.js": 312,
	"./sl": 313,
	"./sl.js": 313,
	"./sq": 314,
	"./sq.js": 314,
	"./sr": 315,
	"./sr-cyrl": 316,
	"./sr-cyrl.js": 316,
	"./sr.js": 315,
	"./ss": 317,
	"./ss.js": 317,
	"./sv": 318,
	"./sv.js": 318,
	"./sw": 319,
	"./sw.js": 319,
	"./ta": 320,
	"./ta.js": 320,
	"./te": 321,
	"./te.js": 321,
	"./tet": 322,
	"./tet.js": 322,
	"./tg": 323,
	"./tg.js": 323,
	"./th": 324,
	"./th.js": 324,
	"./tl-ph": 325,
	"./tl-ph.js": 325,
	"./tlh": 326,
	"./tlh.js": 326,
	"./tr": 327,
	"./tr.js": 327,
	"./tzl": 328,
	"./tzl.js": 328,
	"./tzm": 329,
	"./tzm-latn": 330,
	"./tzm-latn.js": 330,
	"./tzm.js": 329,
	"./ug-cn": 331,
	"./ug-cn.js": 331,
	"./uk": 332,
	"./uk.js": 332,
	"./ur": 333,
	"./ur.js": 333,
	"./uz": 334,
	"./uz-latn": 335,
	"./uz-latn.js": 335,
	"./uz.js": 334,
	"./vi": 336,
	"./vi.js": 336,
	"./x-pseudo": 337,
	"./x-pseudo.js": 337,
	"./yo": 338,
	"./yo.js": 338,
	"./zh-cn": 339,
	"./zh-cn.js": 339,
	"./zh-hk": 340,
	"./zh-hk.js": 340,
	"./zh-tw": 341,
	"./zh-tw.js": 341
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 440;

/***/ })

},[342]);
//# sourceMappingURL=main.js.map