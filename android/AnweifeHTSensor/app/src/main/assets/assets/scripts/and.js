var AREA_GROUP_LIST_Tag = 'AREA_GROUP_LIST';
var DEVICES_LIST_Tag = 'DEVICES_LIST';
var USERS_LIST_Tag = 'USERS_LIST';
var CURR_USER = 'CURR_USER';
var LANG = 'LANG';

var andJS = 
{
    getAreaGroup : function ()
    {
        var areaGroupStr = AndroidObj.getDB(AREA_GROUP_LIST_Tag);
        var areaGroup = JSON.parse(areaGroupStr);
        return areaGroup;
    },

    updateAreaGroup : function (data)
    {
        var areaGroupStr = JSON.stringify(data);
        AndroidObj.putDB(AREA_GROUP_LIST_Tag, areaGroupStr);
    },

    getCurrStatus: function()
    {
        var statusStr = AndroidObj.keySearch("DEVICE_+|CURR_+|");
        var aryStatus = JSON.parse(statusStr);

        var devStr = AndroidObj.getDB(DEVICES_LIST_Tag);
        var aryDev = JSON.parse(devStr);

        var aryAns = [];
        aryDev.forEach(function(dev){

            for(var i = 0; i <  aryStatus.length ; i ++)
            {
                if(aryStatus[i].indexOf(dev['mac']) != -1)
                {
                    var dataStr = AndroidObj.getDB(aryStatus[i]);
                    var data = JSON.parse(dataStr);
                    data['sn'] = dev['sn'];
                    data['name'] = dev['name'];
                    data['groupId'] = dev['groupId'];
                    data['areaId'] = dev['areaId'];
                    aryAns.push(data);
                    break;
                }
            }
        });

        return aryAns;
    },

    getDevices: function()
    {
        var devStr = AndroidObj.getDB(DEVICES_LIST_Tag);
        var aryDev = JSON.parse(devStr);
        return aryDev;
    },

    updateDevices: function(data)
    {
        var devicesStr = JSON.stringify(data);
        AndroidObj.putDB( DEVICES_LIST_Tag, devicesStr);
    },

    getSN:function()
    {
        return AndroidObj.getSN();
    },

    getUsers:function()
    {
        var usersStr = AndroidObj.getDB(USERS_LIST_Tag);
        var aryUsers = JSON.parse(usersStr);
        return aryUsers;
    },

    updateUsers: function(data)
    {
        var usersStr = JSON.stringify(data);
        AndroidObj.putDB( USERS_LIST_Tag, usersStr);
    },

    getLast24HrRec: function(devName)
    {
        var ansData = {};

        var keyStr = AndroidObj.getLast24HrRec(devName);
        var aryKeys = JSON.parse(keyStr);
        for(var i =0 ; i< aryKeys.length ; i++)
        {
            var tempStr = AndroidObj.keySearch(aryKeys[i]);
            var aryAllKeysInHour = JSON.parse(tempStr);


            console.log('aryAllKeysInHour : ' + tempStr);

            var aryRecInHour = [];
            for(var k = 0; k < aryAllKeysInHour.length;k ++)
            {
                var strData = AndroidObj.getDB(aryAllKeysInHour[k]);

                console.log('strData : ' + strData);

                var aryData = strData.split(',');
                var data =
                {
                    'date': aryData[0],
                    'time': aryData[1],
                    'temperature': aryData[2],
                    'humidity': aryData[3]
                };
                aryRecInHour.push(data);
            }
            var ansKey = aryKeys[i].substring(aryKeys[i].length-2, aryKeys[i].length);

            console.log('ansKey : ' + ansKey);

            ansData[ansKey] = aryRecInHour;
        }

        return ansData;

    },

    getCurrUser()
    {
        return AndroidObj.getDB(CURR_USER);
    },

    log: function(test)
    {
        console.log(test);
    },

    getLang : function()
    {
        var lang = AndroidObj.getDB(LANG);
        return lang;
    }


}
