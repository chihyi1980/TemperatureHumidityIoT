package com.anweife.htsensor;

import org.json.JSONArray;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class Utils {
    public static final String SPR = "_+|";
    public static final String DEVICE = "DEVICE";
    public static final String CURRENT = "CURR";
    public static final String RECORD = "REC";
    public static final String DEVICES_LIST_Tag = "DEVICES_LIST";
    public static final String AREA_GROUP_LIST_Tag = "AREA_GROUP_LIST";
    private static final String SN_Tag = "SN_NUM";
    public static final String USERS_LIST_Tag = "USERS_LIST";

    public static final String SCAN_CURR_PREFIX = DEVICE + SPR + CURRENT + SPR;
    public static final String DEVICE_RECORD_PREFIX = Utils.DEVICE + Utils.SPR + Utils.RECORD + Utils.SPR;

    public static String getNowMonth()
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Date current = new Date();
        return sdf.format(current).toString();
    }

    public static String getNowTime()
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date current = new Date();
        return sdf.format(current).toString();
    }

    public static String getNowDate()
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date current = new Date();
        return sdf.format(current).toString();
    }

    public static String getNowTimeOnly()
    {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date current = new Date();
        return sdf.format(current).toString();
    }

    public static String getSN(DB db)
    {
        if(db.isExist(SN_Tag))
        {
            String snStr = db.get(SN_Tag);
            Integer snInt = (new Integer(snStr) + 1);
            db.put(SN_Tag, snInt.toString());
            return snInt.toString();
        }else{
            String snStr = "1";
            db.put(SN_Tag, "1");
            return snStr;
        }
    }

    public static Date getDateByStr(String dateStr)
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = null;
        try {
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static ArrayList<String> getLastDateStr(int overDate)
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        ArrayList<String> aryDays = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        for(int i =0 ; i < overDate ; i++)
        {
            String temp = sdf.format(calendar.getTime());
            aryDays.add(temp);
            calendar.add(Calendar.DATE,  -1);
        }

        return aryDays;
    }

    public static ArrayList<String> getLast24HrRecKey(String devName)
    {
        ArrayList<String> aryKeys = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH");

        for(int i = 0 ; i < 24 ; i++)
        {
            String dateStr = sdf.format(cal.getTime());
            String recKey  = Utils.DEVICE_RECORD_PREFIX + devName + Utils.SPR + dateStr;
            aryKeys.add(recKey);
            cal.add(Calendar.HOUR_OF_DAY, -1 );
        }

        return aryKeys;
    }
}
