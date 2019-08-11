import {Injectable} from '@angular/core';

declare var lang_en: any;
declare var lang_tw: any;
declare var lang_cn: any;
declare var andJS: any;

@Injectable()
export class GlobalVars {

    public areaFilterId = -1;
    public groupFilterId = -1;
    public groups = [];
    public areaGroups = [];

    public aryDevices = [];

    public lang = 
    {
        'status':'Status',
        'area':'Area',
        'group':'Group',
        'devices':'Devices',
        'accounts':'Accounts',
        'sn':'SN',
        'name':'Name',
        'saveRate':'Save rate',
        'savePath':'Save path',
        'mac':'Mac',
        'save':'Save',
        'delete':'Delete',
        'id':'ID',
        'password':'Password',
        'add_new_user':'Add New User',
        'add_new_device':'Add New Device',
        'temperature':'Temperature',
        'humidity':'Humidity',
        'date':'Date',
        'chart':'last 24 hours chart',
        'detail':'Detail',
        'logs':'Logs',
        'time':'Time',
        'search':'Search',
        'all':'All',
        'new':'New',
        'device_name':'Device Name',
        'new_area':'New Area',
        'new_group':'New Group',
        'add_new_area':'Add New Area',
        'add_new_group':'Add New Group',
        'area_name':'Area Name',
        'group_name':'Group Name',
        'cancel':'Cancel',
        'delete_device':'Delete device',
        'ok':'OK',
        'saved':'saved',
        'deleted':'deleted',
        'save_user': 'Save User',
        'delete_user': 'Delete User',
        'username': 'User Name',
        'user_name_is_alreay_exist':'User name is alreay exist',
        'admin_account_cant_be_deleted': 'Admin account can\'t be deleted ',
    };

    constructor() {
        this.init();
        this.selectLang();
    }

    init()
    {
        this.aryDevices = andJS.getDevices();
    }

    selectLang()
    {
        var selLang = andJS.getLang();
        if(selLang == 'lang_en')
        {
            this.lang = lang_en;
        }else if(selLang == 'lang_tw')
        {
            this.lang = lang_tw;
        }else if(selLang == 'lang_cn')
        {
            this.lang = lang_cn;
        }
    }


    filterDevices()
    {
        this.aryDevices = andJS.getDevices();
        this.aryDevices = this.aryDevices.filter((device) => {
            if(this.areaFilterId == -1 && this.groupFilterId == -1)
                return true;
            if(this.areaFilterId != -1 && device.areaId == this.areaFilterId )
            {
                return true;
            }else if(this.groupFilterId != -1 && device.groupId == this.groupFilterId )
            {
                return true;
            }
        });
    }

    findAreaGroupName(sn)
    {
        var tempAG = andJS.getAreaGroup();
        for(var i = 0; i< tempAG.length ; i++)
        {
            if(tempAG[i].sn == sn)
            {
                return tempAG[i].name;
            }
            if(tempAG[i].list)
            {
                for(var k = 0; k< tempAG[i].list.length ; k++)
                {
                    if(tempAG[i].list[k].sn == sn)
                    {
                        return tempAG[i].list[k].name;
                    }
                }
            }
        }

        return '';
    }

}