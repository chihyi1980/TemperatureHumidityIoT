package com.anweife.htsensor;

import android.os.RemoteException;
import android.util.Log;
import android.webkit.JavascriptInterface;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

// 继承自Object类
public class AndroidtoJs extends Object {

    IAnwiefeHTService mService;

    public AndroidtoJs(IAnwiefeHTService service)
    {
        mService = service;
    }
    // 定义JS需要调用的方法
    // 被JS调用的方法必须加入@JavascriptInterface注解
    @JavascriptInterface
    public void test(String msg)
    {
        Log.i("test",msg);
    }

    @JavascriptInterface
    public void putDB(String key, String value)
    {
        try {
            mService.putDB(key, value);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public String getDB(String key)
    {
        try {
            return mService.getDB(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @JavascriptInterface
    public String keySearch(String key)
    {
        try {
            return mService.keySearch(key);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return null;
    }

    @JavascriptInterface
    public String isExist(String key)
    {
        try {
            return mService.isExist(key);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return Boolean.FALSE.toString();
    }

    @JavascriptInterface
    public void del(String key)
    {
        try {
            mService.del(key);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public String getSN()
    {
        try {
            return mService.getSN();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return null;
    }

    @JavascriptInterface
    public String getLast24HrRec(String devName)
    {
        ArrayList<String> aryKeys = Utils.getLast24HrRecKey(devName);
        JSONArray jsonArray = new JSONArray();
        for (String key: aryKeys)
        {
            jsonArray.put(key);
        }
        return jsonArray.toString();
    }
}
