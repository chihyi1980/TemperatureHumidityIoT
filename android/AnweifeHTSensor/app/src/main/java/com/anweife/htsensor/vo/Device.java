package com.anweife.htsensor.vo;

import com.anweife.htsensor.Utils;

import org.json.JSONException;
import org.json.JSONObject;

public class Device {

    public String sn;
    public String name;
    public String mac;
    public String updateDate;
    public String saveRate;
    public String savePath;

    public Device(String sn, String name, String mac, String saveRate, String savePath)
    {
        this.sn = sn;
        this.name = name;
        this.mac = mac;
        this.savePath = savePath;
        this.saveRate = saveRate;
        this.updateDate = Utils.getNowTime();
    }

    public Device(JSONObject jsonObject)
    {
        try {
            //JSONObject jsonObject = new JSONObject(json);
            this.sn = jsonObject.getString("sn");
            this.name = jsonObject.getString("name");
            this.mac = jsonObject.getString("mac");
            this.updateDate = jsonObject.getString("updateDate");
            this.saveRate = jsonObject.getString("saveRate");
            this.savePath = jsonObject.getString("savePath");

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public JSONObject getJSONObj()
    {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("sn", this.sn);
            jsonObject.put("name", this.name);
            jsonObject.put("mac", this.mac);
            jsonObject.put("updateDate", this.updateDate);
            jsonObject.put("saveRate", this.saveRate);
            jsonObject.put("savePath", this.savePath);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
