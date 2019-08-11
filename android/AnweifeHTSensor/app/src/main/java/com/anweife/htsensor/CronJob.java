package com.anweife.htsensor;


import android.content.Context;
import android.os.Environment;
import android.util.Log;

import com.anweife.htsensor.vo.Device;
import com.anweife.htsensor.vo.ScanHTValue;
import com.esotericsoftware.kryo.util.Util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.TimerTask;

public class CronJob extends TimerTask
{
    private DB mDB;
    private ArrayList<Device> mCurrDevList = new ArrayList<>();
    private long mClearPeriodSec = 3 * 60 * 1000L;
    private Context mContext = null;


    public CronJob(Context context, DB db)
    {
        this.mContext = context;
        this.mDB = db;
    }

    @Override
    public void run() {
        cleanOldScanValue(mClearPeriodSec);
        mCurrDevList = this.loadDevicesAry();
        saveScanRec();
        saveLog();
        cleanOldScanRec(7);
    }

    private String getLogContent(String name, int periodInMin)
    {
        Calendar calendar = Calendar.getInstance();
        StringBuffer sb = new StringBuffer();
        //sb.append("Time,Temperature,Humidity\r\n");
/*
        for(int i = 0 ; i < periodInMin ; i++)
        {
            if(i > 0)
                calendar.add(Calendar.MINUTE, -1);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String key = Utils.DEVICE_RECORD_PREFIX + name + Utils.SPR + sdf.format(calendar.getTime());
            if(mDB.isExist(key))
            {
                sb.append(mDB.get(key));
                sb.append("\r\n");
            }
        }
*/

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String key = Utils.DEVICE_RECORD_PREFIX + name + Utils.SPR + sdf.format(calendar.getTime());
        String ans = mDB.get(key);
        if(ans == null || ans.equals("null"))
            return null;
        sb.append(ans);
        sb.append("\r\n");

        return sb.toString();
    }

    public void saveCSVFile(String sn, String name, String content)
    {

//        File root = Environment.getExternalStorageDirectory();
        //File dir = mContext.getExternalFilesDir(null);
//        File dir = new File(root, "AnweifeHT");
        String dirStr = Environment.getExternalStorageDirectory().getAbsolutePath()+"/AnweifeHT/"+sn+"_"+name+"/";

        File csvDir = new File(dirStr);

        if(!csvDir.isDirectory())
            csvDir.mkdirs();

        File csvFile = new File(csvDir, sn+"_"+name+"_"+Utils.getNowMonth()+".csv");

        //File csvFile = new File(csvDir, sn + "_" + name +".csv");

        boolean isNew = false;

        if(!csvFile.exists()) {
            try {
                csvFile.createNewFile();
                isNew = true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            FileOutputStream stream = new FileOutputStream(csvFile, true);
            try {
                if(isNew)
                {
                    String temp = "Date, Time, Temperature, Humidity \r\n ";
                    stream.write(temp.getBytes());
                }
                stream.write(content.getBytes());
            } finally {
                stream.close();
                Log.i("csvFilePath: ", csvFile.getAbsolutePath());
                Log.i("write file", content);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private void saveLog()
    {
        Calendar calendar = Calendar.getInstance();
        int min = calendar.get(Calendar.MINUTE);
        int hr = calendar.get(Calendar.HOUR_OF_DAY);

        if(mCurrDevList == null)
            return;

        for(Device dev: mCurrDevList)
        {
            String content = null;
            //5 min
            if(dev.saveRate.equals("1"))
            {
                if( min % 5 == 0 )
                {
                    content = this.getLogContent(dev.name, 5);
                }
            //15 min
            }else if(dev.saveRate.equals("2"))
            {
                if( min % 15 == 0 )
                {
                    content = this.getLogContent(dev.name, 15);
                }
            //45 min
            }else if(dev.saveRate.equals("3"))
            {
                if( (hr * 60 + min) % 45 == 0 )
                {
                    content = this.getLogContent(dev.name, 45);
                }
            //1 H
            }else if(dev.saveRate.equals("4"))
            {
                if( (hr * 60 + min) % 60 == 0 )
                {
                    content = this.getLogContent(dev.name, 60);
                }
            //2 H
            }else if(dev.saveRate.equals("5"))
            {
                if( (hr * 60 + min) % 120 == 0 )
                {
                    content = this.getLogContent(dev.name, 120);
                }
            //4 H
            }else if(dev.saveRate.equals("6"))
            {
                if( (hr * 60 + min) % 240 == 0 )
                {
                    content = this.getLogContent(dev.name, 240);
                }
            //8 H
            }else if(dev.saveRate.equals("7"))
            {
                if( (hr * 60 + min) % 480 == 0 )
                {
                    content = this.getLogContent(dev.name, 480);
                }

            //12 H
            }else if(dev.saveRate.equals("8"))
            {
                if( (hr * 60 + min) % 720 == 0 )
                {
                    content = this.getLogContent(dev.name, 720);
                }

            //24 H
            }else if(dev.saveRate.equals("9"))
            {
                if( (hr * 60 + min) % 1440 == 0 )
                {
                    content = this.getLogContent(dev.name, 1440);
                }
            }

            if(content != null )
            {
                Log.i("content", content);
                saveCSVFile(dev.sn, dev.name, content);
            }
        }
    }

    private void cleanOldScanValue(Long period)
    {
        String[] aryScanCurr = mDB.keySearch(Utils.SCAN_CURR_PREFIX);

        if(aryScanCurr != null && aryScanCurr.length > 0)
        {
            for (String key : aryScanCurr)
            {
                String scanRecStr = mDB.get(key);
                ScanHTValue scanHTValue = new ScanHTValue(scanRecStr);

//                Log.i("scanRecStr : ", scanRecStr);
//                Log.i("updatetime", Utils.getDateByStr(scanHTValue.updateDate).toString());
//                Log.i("updatetime_key", key);
//                Log.i("updatetime", scanHTValue.updateDate);

                long scanTime = Utils.getDateByStr(scanHTValue.updateDate).getTime();
                if(new Date().getTime() - scanTime > period)
                {
                    Log.i("del", mDB.get(key));
                    mDB.del(key);
                }
            }
        }
    }

    private void saveScanRec()
    {
        Calendar calendar = Calendar.getInstance();
        int min = calendar.get(Calendar.MINUTE);

        if(min % 5 != 0)
        {
            return;
        }

        String[] aryScanCurr = mDB.keySearch(Utils.SCAN_CURR_PREFIX);
        if(aryScanCurr != null && aryScanCurr.length > 0)
        {
            for (String key:aryScanCurr)
            {
                String scanRecStr = mDB.get(key);
                ScanHTValue scanHTValue = new ScanHTValue(scanRecStr);
                Device matchDev = getMacInCurrDeviceList(scanHTValue.mac);
                if(matchDev != null)
                {
                    String newKey = Utils.DEVICE_RECORD_PREFIX + matchDev.name + Utils.SPR + Utils.getNowTime();
                    String data = Utils.getNowDate() + "," + Utils.getNowTimeOnly() + "," + scanHTValue.temperature + ","+ scanHTValue.humidity;
                    mDB.put(newKey, data);

                    Log.i("save rec key", newKey);
                    Log.i("save rec data", data);
                }
            }
        }
    }

    //clean over 3 days records
    private void cleanOldScanRec(int overDate)
    {
        Calendar calendar = Calendar.getInstance();
        int min = calendar.get(Calendar.MINUTE);
        int hr = calendar.get(Calendar.HOUR_OF_DAY);

        //每天0:03執行一次
        if((hr * 60 + min) != 3 )
            return;

        ArrayList<String> lastDate = Utils.getLastDateStr(overDate);
        String[] aryKeys = mDB.keySearch(Utils.DEVICE_RECORD_PREFIX);

        //Log.i("aryKeys", new Integer(aryKeys.length).toString());

        for(String key: aryKeys)
        {
            boolean isDel = true;
            for(String date: lastDate)
            {
                if(key.indexOf(date) != -1)
                    isDel = false;
            }

            if(isDel == true)
            {
                mDB.del(key);
                Log.i("del ", key);
            }

        }

    }

    private Device getMacInCurrDeviceList(String mac)
    {
        if(mCurrDevList == null)
            return null;
        for(Device dev: mCurrDevList)
        {
            if(mac.equals(dev.mac))
                return dev;
        }
        return null;
    }

    private ArrayList<Device> loadDevicesAry()
    {
        ArrayList<Device> aryDev = new ArrayList<>();

        if(mDB.isExist(Utils.DEVICES_LIST_Tag))
        {
            String json = mDB.get(Utils.DEVICES_LIST_Tag);
            Log.i(Utils.DEVICES_LIST_Tag, json);
            try {
                JSONArray aryTemp = new JSONArray(json);
                for(int i=0 ;i < aryTemp.length(); i++)
                {
                    JSONObject jsonObject = (JSONObject) aryTemp.get(i);
                    Device dev = new Device(jsonObject);
                    aryDev.add(dev);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return  aryDev;
        }else{
            return null;
        }
    }
}
