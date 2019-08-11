package com.anweife.htsensor.vo;

import android.util.Log;

import com.anweife.htsensor.Utils;
import com.esotericsoftware.kryo.util.Util;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScanHTValue {
    public String mac;
    public String battery;
    public String rssi;
    public String temperature;
    public String humidity;
    public String updateDate;

    public ScanHTValue(String mac, Integer battery, Integer rssi, Double temperature, Double humidity, String updateDate)
    {
        this.mac = mac;
        this.battery = battery.toString();
        this.rssi = rssi.toString();

        DecimalFormat df = new DecimalFormat("#.0");
        this.temperature = df.format(temperature);
        this.humidity = df.format(humidity);

        this.updateDate = updateDate;
    }

    public ScanHTValue(String json)
    {
        try {
            JSONObject jsonObject = new JSONObject(json);
            this.mac = jsonObject.getString("mac");
            this.battery = jsonObject.getString("battery");
            this.rssi = jsonObject.getString("rssi");
            this.temperature = jsonObject.getString("temperature");
            this.humidity = jsonObject.getString("humidity");
            this.updateDate = jsonObject.getString("updateDate");

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    public String getJSON()
    {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("mac", this.mac);
            jsonObject.put("battery", this.battery);
            jsonObject.put("rssi", this.rssi);
            jsonObject.put("temperature", this.temperature);
            jsonObject.put("humidity", this.humidity);
            jsonObject.put("updateDate", this.updateDate);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();

    }


}
