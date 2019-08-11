package com.anweife.htsensor;

import android.content.Context;
import android.util.Log;

import com.snappydb.DBFactory;
import com.snappydb.SnappydbException;

import java.util.Calendar;

public class DB {

    com.snappydb.DB mSnappydb;

    public DB(Context context)
    {
        try {
            mSnappydb = DBFactory.open(context); //create or open an existing database using the default name
        } catch (SnappydbException e) {
            e.printStackTrace();
        }
    }

    public void put(String key , String value)
    {
        try {
            mSnappydb.put(key, value);
//            Log.i("Time : ", Calendar.getInstance().getTime().toString());
//            Log.i("DB put key : ", key);
//            Log.i("DB put value : ", value);
        } catch (SnappydbException e) {
            e.printStackTrace();
        }
    }

    public String get(String key)
    {
//        Log.i("Time : ", Calendar.getInstance().getTime().toString());
//        Log.i("DB get : ", key);
        try {
            return mSnappydb.get(key);
        } catch (SnappydbException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String[] keySearch(String key)
    {
//        Log.i("DB keySearch : ", key);

        try {
            return mSnappydb.findKeys(key);
        } catch (SnappydbException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void close()
    {
        try {
            mSnappydb.close();
        } catch (SnappydbException e) {
            e.printStackTrace();
        }
    }

    public boolean isExist(String key)
    {
        try {
            return mSnappydb.exists(key);
        } catch (SnappydbException e) {
            e.printStackTrace();
            return false;
        }
    }

    public void del(String key)
    {
        try {
            mSnappydb.del(key);
        } catch (SnappydbException e) {
            e.printStackTrace();
        }
    }

}
