package com.anweife.htsensor;

import android.Manifest;
import android.app.NotificationManager;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Binder;
import android.os.Environment;
import android.os.IBinder;
import android.os.RemoteException;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;

import com.anweife.htsensor.vo.Device;
import com.anweife.htsensor.vo.ScanHTValue;
import com.esotericsoftware.kryo.util.Util;
import com.minew.beaconplus.sdk.MTCentralManager;
import com.minew.beaconplus.sdk.MTFrameHandler;
import com.minew.beaconplus.sdk.MTPeripheral;
import com.minew.beaconplus.sdk.enums.BluetoothState;
import com.minew.beaconplus.sdk.enums.ConnectionStatus;
import com.minew.beaconplus.sdk.enums.FrameType;
import com.minew.beaconplus.sdk.exception.MTException;
import com.minew.beaconplus.sdk.frames.HTFrame;
import com.minew.beaconplus.sdk.frames.MinewFrame;
import com.minew.beaconplus.sdk.interfaces.ConnectionStatueListener;
import com.minew.beaconplus.sdk.interfaces.GetPasswordListener;
import com.minew.beaconplus.sdk.interfaces.MTCentralManagerListener;
import com.snappydb.SnappydbException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class MainService extends Service {
    private final IBinder mBinder = new MyBinder();
    private NotificationManager mNotification;
    private Timer mTimer = new Timer();
//    MTCentralManager mtCentralManager = MTCentralManager.getInstance(this);
//    private MTCentralManager mMtCentralManager;
    private DB mDB;
    private ScanJob mScanJob;

    private final long LAST_UPDATE_PERIOD = 20 * 1000;

    public MainService()
    {
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        Log.i("Destroy","Service destroy");
    }

    @Override
    public void onCreate()
    {
        super.onCreate();
        mDB = new DB(this);
        this.startScan();
        this.startCron();

        //test
        this.initData();


        //test
        Log.i("AREA_GROUP_LIST_Tag", mDB.get(Utils.AREA_GROUP_LIST_Tag));
    }

    public IAnwiefeHTService.Stub stub = new IAnwiefeHTService.Stub()
    {
        public void startScan()
        {

        }

        public void startCron()
        {
            MainService.this.startCron();
        }

        public void putDB(String key, String value)
        {
            mDB.put(key, value);
        }

        public String getDB(String key)
        {
            return mDB.get(key);
        }
        public String keySearch(String key)
        {
            String[] aryAns = mDB.keySearch(key);
            JSONArray jsonArray = new JSONArray();
            for(String value: aryAns)
            {
                jsonArray.put(value);
            }
            String json = jsonArray.toString();
            return json;
        }
        public String isExist(String key)
        {
            if(mDB.isExist(key))
            {
                return Boolean.TRUE.toString();
            }
            else
            {
                return Boolean.FALSE.toString();
            }
        }
        public void del(String key)
        {
            mDB.del(key);
        }

        public String getSN()
        {
            return Utils.getSN(mDB);
        }
    };

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return stub;
    }

    public class MyBinder extends Binder {
        public MainService getService() {
            return MainService.this;
        }
    }

    private void startCron()
    {
        mTimer = new Timer();
        CronJob job = new CronJob(this,mDB);
        mTimer.schedule(job, 30000L, 60 * 1000);
    }

    private void startScan()
    {
        mScanJob = new ScanJob(this, mDB);
    }

    /*
    private void initListener() {
        mMtCentralManager.setMTCentralManagerListener(new MTCentralManagerListener() {
            @Override
            public void onScanedPeripheral(final List<MTPeripheral> peripherals) {

                for (MTPeripheral mtPeripheral : peripherals) {
                    // get FrameHandler of a device.
                    MTFrameHandler mtFrameHandler = mtPeripheral.mMTFrameHandler;

                    if(new Date().getTime() - mtFrameHandler.getLastUpdate() > LAST_UPDATE_PERIOD)
                        continue;

                    try {
                        // all data frames of device（such as:iBeacon，UID，URL...）
                        ArrayList<MinewFrame> advFrames = mtFrameHandler.getAdvFrames();

                        if (advFrames.size() >= 5) {
                            if (advFrames.get(4) == null)
                                return;

                            FrameType frameType = null;
                            try {
                                frameType = advFrames.get(4).getFrameType();
                            }catch (NullPointerException e2)
                            {
                                e2.printStackTrace();
                            }
                            if (frameType != null && frameType == FrameType.FrameHTSensor) {

                                String mac = mtFrameHandler.getMac();        //mac address of device
                                //String name = mtFrameHandler.getName();        // name of device
                                int battery = mtFrameHandler.getBattery();    //battery
                                int rssi = mtFrameHandler.getRssi();        //rssi

                                HTFrame htFrame = (HTFrame) advFrames.get(4);
                                double temperature = htFrame.getTemperature();
                                double humidity = htFrame.getHumidity();

                                String key = Utils.SCAN_CURR_PREFIX + mac;
                                String updateDate = Utils.getNowTime();
                                String value = new ScanHTValue(mac, battery, rssi, temperature, humidity, updateDate).getJSON();
                                mDB.put(key, value);

                                //test
//                                Log.i("scan", value);

                            }
                        }
                    }catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                }

            }
        });
    }
    */

    /*
    private void initManager() {
        mMtCentralManager = MTCentralManager.getInstance(this);
        mMtCentralManager.startService();
    }
    */

    /*
    private void startScan()
    {
        try {
            this.initManager();
            BluetoothAdapter.getDefaultAdapter().enable();
            this.initListener();
            mtCentralManager.startScan();
        }catch (Exception e)
        {
            e.printStackTrace();
        }
    }
    */

    //test
    private void initData()
    {

        try {

            //device list
            //JSONObject jsonObject = new JSONObject();
            //jsonObject.put("snNum" , "3");

            JSONArray jsonArray = new JSONArray();
            Device device1 = new Device(Utils.getSN(mDB), "5410", "AC:23:3F:A0:54:10", "1","/AnweifeHT/1_5410/");
            Device device2 = new Device(Utils.getSN(mDB), "5561", "AC:23:3F:A0:55:61", "2","/AnweifeHT/2_5561/");
            Device device3 = new Device(Utils.getSN(mDB), "5409", "AC:23:3F:A0:54:09", "3","/AnweifeHT/3_5409/");

            jsonArray.put(device1.getJSONObj());
            jsonArray.put(device2.getJSONObj());
            jsonArray.put(device3.getJSONObj());
            //jsonObject.put("list", jsonArray);


            Log.i("devices: ", jsonArray.toString());

            if(!mDB.isExist(Utils.DEVICES_LIST_Tag))
                mDB.put(Utils.DEVICES_LIST_Tag, new JSONArray().toString());
//                mDB.put(Utils.DEVICES_LIST_Tag, jsonArray.toString());

            //area group
            //JSONObject jsonObject2 = new JSONObject();
            //jsonObject2.put("snNum", "6");

            JSONArray jsonArray2 = new JSONArray();

            JSONObject jsonObjectArea1 = new JSONObject();
            jsonObjectArea1.put("sn", Utils.getSN(mDB));
            jsonObjectArea1.put("name", "area1");
            jsonObjectArea1.put("type", "area");

            JSONArray jsonArrayGroup1 = new JSONArray();
            JSONObject jsonObjectGroup1 = new JSONObject();
            jsonObjectGroup1.put("sn", Utils.getSN(mDB));
            jsonObjectGroup1.put("name", "group1");
            jsonObjectGroup1.put("type", "group");
            jsonArrayGroup1.put(jsonObjectGroup1);
            jsonObjectArea1.put("list", jsonArrayGroup1);

            JSONObject jsonObjectArea2 = new JSONObject();
            jsonObjectArea2.put("sn", Utils.getSN(mDB));
            jsonObjectArea2.put("name", "area2");
            jsonObjectArea2.put("type", "area");

            JSONArray jsonArrayGroup2 = new JSONArray();
            JSONObject jsonObjectGroup2 = new JSONObject();
            jsonObjectGroup2.put("sn", Utils.getSN(mDB));
            jsonObjectGroup2.put("name", "group2");
            jsonObjectGroup2.put("type", "group");
            JSONObject jsonObjectGroup3 = new JSONObject();
            jsonObjectGroup3.put("sn", Utils.getSN(mDB));
            jsonObjectGroup3.put("name", "group3");
            jsonObjectGroup3.put("type", "group");
            jsonArrayGroup2.put(jsonObjectGroup2);
            jsonArrayGroup2.put(jsonObjectGroup3);
            jsonObjectArea2.put("list", jsonArrayGroup2);

            JSONObject jsonObjectArea3 = new JSONObject();
            jsonObjectArea3.put("sn", Utils.getSN(mDB));
            jsonObjectArea3.put("name", "area3");
            jsonObjectArea3.put("type", "area");

            jsonArray2.put(jsonObjectArea1);
            jsonArray2.put(jsonObjectArea2);
            jsonArray2.put(jsonObjectArea3);
            //jsonObject2.put("area", jsonArray2);

            if(!mDB.isExist(Utils.AREA_GROUP_LIST_Tag) )
                mDB.put(Utils.AREA_GROUP_LIST_Tag, new JSONArray().toString());
//                mDB.put(Utils.AREA_GROUP_LIST_Tag, jsonArray2.toString());

            JSONArray jsonArray3 = new JSONArray();
            JSONObject jsonObjectUser = new JSONObject();
            jsonObjectUser.put("sn", Utils.getSN(mDB));
            jsonObjectUser.put("username", "admin");
            jsonObjectUser.put("password", "admin");
            jsonArray3.put(jsonObjectUser);

            if(!mDB.isExist(Utils.USERS_LIST_Tag) )
                mDB.put(Utils.USERS_LIST_Tag, jsonArray3.toString());

            Log.i("users: ", mDB.get(Utils.USERS_LIST_Tag));

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
}
