var AREA_GROUP_LIST_Tag = 'AREA_GROUP_LIST';
var DEVICES_LIST_Tag = 'DEVICES_LIST';
var USERS_LIST_Tag = 'USERS_LIST';
var LANG = 'LANG';

var andJS = 
{
    getAreaGroup : function ()
    {
        //var areaGroupStr = AndroidObj.getDB(AREA_GROUP_LIST_Tag);
        //var areaGroup = JSON.parse(areaGroupStr);

        var areaGroup = 
      [
          {
              sn: 1000,
              type:'area',
              name:'A1',
              list:[
                  {
                      sn: 1001,
                      type:'group',
                      name:'G1'
                  },
                  {
                      sn: 1002,
                      type:'group',
                      name:'G2'
                  }
              ]
          },
          {
              sn: 1003,
              type:'area',
              name:'A2',
              list:
              [
                  {
                      sn: 1004,
                      type:'group',
                      name: 'G3'
                  }
              ]
          },
          {
              sn:1005,
              type:'area',
              name:'A3'
          }
      ];
        return areaGroup;

        //var ggg = '[{"sn":"39","type":"area","name":"A1"},{"sn":"40","type":"area","name":"A2"}]';
        //return JSON.parse(ggg);
    },

    updateAreaGroup : function (data)
    {
        var areaGroupStr = JSON.stringify(data);
        //AndroidObj.putDB(AREA_GROUP_LIST_Tag, areaGroupStr);
    },

    getCurrStatus: function()
    //testCall: function()
    {
        /*
        var statusStr = AndroidObj.keySearch("DEVICE_+|CURR_+|");
        var aryStatus = JSON.parse(statusStr);

        var devStr = AndroidObj.getDB(DEVICES_LIST_Tag);
        var aryDev = JSON.parse(devStr);

        var aryAns = [];
        aryDev.forEach(function(dev){

            //console.log(dev);

            for(var i = 0; i <  aryStatus.length ; i ++)
            {
                if(aryStatus[i].indexOf(dev['mac']) != -1)
                {
                    var dataStr = AndroidObj.getDB(aryStatus[i]);
                    var data = JSON.parse(dataStr);
                    data['sn'] = dev['sn'];
                    data['name'] = dev['name'];
                    aryAns.push(data);
                    break;
                }
            }
        });
        */
        var json = '[{"mac":"AC:23:3F:A0:54:10","battery":"100","rssi":"-53","temperature":"20.81","humidity":"83.00","updateDate":"2018-12-16 01:27","sn":"1","name":"5410", "areaId":"1000", "groupId":"1001"},{"mac":"AC:23:3F:A0:55:61","battery":"100","rssi":"-52","temperature":"20.98","humidity":"82.65","updateDate":"2018-12-16 13:37","sn":"2","name":"5561", "areaId":"1000", "groupId":"1002"},{"mac":"AC:23:3F:A0:54:09","battery":"100","rssi":"-54","temperature":"21.09","humidity":"82.24","updateDate":"2018-12-16 13:37","sn":"3","name":"5409", "areaId":"1003", "groupId":"1004"}]';

        return JSON.parse(json);
    },

    getDevices: function()
    {
        /*
        var devStr = AndroidObj.getDB(DEVICES_LIST_Tag);
        var aryDev = JSON.parse(devStr);
        return aryDev;
        */
        return JSON.parse('[{"sn":"478","name":"5410","mac":"AC:23:3F:A0:54:10","updateDate":"2018-12-19 20:40","saveRate":"1","savePath":"/AnweifeHT/1_5410/", "areaId":"1000", "groupId":"1001"},{"sn":"479","name":"5561","mac":"AC:23:3F:A0:55:61","updateDate":"2018-12-19 20:40","saveRate":"2","savePath":"/AnweifeHT/2_5561/", "areaId":"1000", "groupId":"1002"},{"sn":"480","name":"5409","mac":"AC:23:3F:A0:54:09","updateDate":"2018-12-19 20:40","saveRate":"3","savePath":"/AnweifeHT/3_5409/", "areaId":"1003", "groupId":"1004"}]');
    },

    updateDevices: function(data)
    {
        //var devicesStr = JSON.stringify(data);
        //AndroidObj.putDB( DEVICES_LIST_Tag, devicesStr);
    },

    getSN:function()
    {
        //return AndroidObj.getSN();
        return '123456';
    },

    getUsers:function()
    {
        // var usersStr = AndroidObj.getDB(USERS_LIST_Tag);
        // var aryUsers = JSON.parse(usersStr);
        // return aryUsers;
        return JSON.parse('[{"sn":"315","username":"admin","password":"admin"},{"sn":"316","username":"Q","password":"q"}]');
    },

    updateUsers: function(data)
    {
        var usersStr = JSON.stringify(data);
        console.log(usersStr);

        //AndroidObj.putDB( USERS_LIST_Tag, usersStr);
    },

    getLast24HrRec: function(devName)
    {
        //return AndroidObj.getLast24HrRec(devName);
        return "111";
    },

    getCurrUser()
    {
        //return AndroidObj.getDB(CURR_USER);
        return 'q';
    },

    log: function(test)
    {
        console.log(test);
    },

    getLang : function()
    {
        //var lang = AndroidObj.getDB(LANG);
        //return lang;
        return 'lang_tw';
    }
}
