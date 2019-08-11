package com.anweife.htsensor;

import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.util.Log;
import android.view.View;

import com.anweife.htsensor.vo.ScanHTValue;
import com.minew.beaconplus.sdk.MTCentralManager;
import com.minew.beaconplus.sdk.MTFrameHandler;
import com.minew.beaconplus.sdk.MTPeripheral;
import com.minew.beaconplus.sdk.enums.FrameType;
import com.minew.beaconplus.sdk.frames.HTFrame;
import com.minew.beaconplus.sdk.frames.MinewFrame;
import com.minew.beaconplus.sdk.frames.UidFrame;
import com.minew.beaconplus.sdk.interfaces.MTCentralManagerListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class ScanJob {

    private Service mService = null;
    private MTCentralManager mtCentralManager = null;
    private Timer mTimer = new Timer();
    private final long LAST_UPDATE_PERIOD = 60 * 1000;
    private MTCentralManager mMtCentralManager;
    private DB mDB;

    public ScanJob(Service service, DB db)
    {
        BluetoothAdapter.getDefaultAdapter().enable();

        this.mService = service;
        this.mtCentralManager = MTCentralManager.getInstance(this.mService);
        this.mDB = db;

        this.initManager();
        this.initListener();
        this.startScanJob();
    }

    public void startScanJob()
    {
        mTimer = new Timer();
        StartScanTask job1 = new StartScanTask();
        StopScanTask job2 = new StopScanTask();
        mTimer.schedule(job1, 1000L, 60 * 1000);
        mTimer.schedule(job2, 5000L, 60 * 1000);
    }

    private void initManager() {
        mMtCentralManager = MTCentralManager.getInstance(mService);
        //mMtCentralManager.startService();
    }

    private void initListener() {
        mMtCentralManager.setMTCentralManagerListener(new MTCentralManagerListener() {
            @Override
            public void onScanedPeripheral(final List<MTPeripheral> peripherals) {
                //mAdapter.setData(peripherals);
                for (MTPeripheral peripheral : peripherals) {

                    MTFrameHandler mtFrameHandler = peripheral.mMTFrameHandler;
                    if(new Date().getTime() - mtFrameHandler.getLastUpdate() > LAST_UPDATE_PERIOD)
                        continue;

//                    MTFrameHandler mtFrameHandler = peripheral.mMTFrameHandler;
                    String mac = mtFrameHandler.getMac();
                    Log.i("Scan mac", mac);
                    int battery = mtFrameHandler.getBattery();    //battery
                    int rssi = mtFrameHandler.getRssi();        //rssi
                    for (MinewFrame minewFrame : peripheral.mMTFrameHandler.getAdvFrames()) {
                        switch (minewFrame.getFrameType()){
                            case FrameUID:
//                                UidFrame uidFrame= ((UidFrame) minewFrame);
//                                String nameSpaceId=uidFrame.getNamespaceId();
//                                String instanceId=uidFrame.getInstanceId();
                                break;
                            case FrameURL:
                                break;
                            case FrameiBeacon:
                                break;
                            case FrameHTSensor:
                                HTFrame htFrame = ((HTFrame) minewFrame);
                                double temperature = htFrame.getTemperature();
                                double humidity = htFrame.getHumidity();

//                                Log.i("mac", mac);
//                                Log.i("temperature", new Double(temperature).toString());
//                                Log.i("humidity", new Double(humidity).toString());
//                                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                                String dateStr =  sdf.format(Calendar.getInstance().getTime());
//                                String data = dateStr+","+mac + "," + new Double(temperature).toString() + "," + new Double(humidity).toString()+"\n\r";
                                String key = Utils.SCAN_CURR_PREFIX + mac;
                                String updateDate = Utils.getNowTime();
                                String value = new ScanHTValue(mac, battery, rssi, temperature, humidity, updateDate).getJSON();
                                mDB.put(key, value);

                                Log.i("scan curr  key", key);
                                Log.i("scan curr data", value);

//                                mData += data;


                                break;
                            //Other frame
                        }
                    }
                }
            }
        });
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
                                Log.i("scan", value);

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

    protected class StartScanTask extends TimerTask
    {
        @Override
        public void run() {
            mMtCentralManager.startService();
            mtCentralManager.startScan();

        }
    }

    protected class StopScanTask extends TimerTask
    {
        @Override
        public void run() {
            mtCentralManager.stopScan();
            mMtCentralManager.stopService();
        }
    }
}
