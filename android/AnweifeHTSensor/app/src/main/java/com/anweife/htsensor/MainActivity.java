package com.anweife.htsensor;

import android.Manifest;
import android.app.ActionBar;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.IBinder;
import android.os.RemoteException;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    Context mContext;

    private IAnwiefeHTService mService;
    private ServiceConnection mSc = null;
    private static final int PERMISSION_COARSE_LOCATION = 2;
    private WebView mWebView = null;

    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.hideStatusBar();

        setContentView(R.layout.activity_main);

        mContext = this;

        bindBeaconService();

        mWebView = (WebView) findViewById(R.id.webview1);
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);  // 开启 DOM storage 功能
        mWebView.setWebViewClient(new WebViewClient());
//        mWebView.loadUrl("file:///android_asset/index.html");
//        mWebView.addJavascriptInterface(new AndroidtoJs(mService), "AndroidObj");

    }

    @Override
    protected void onDestroy() {
        // TODO 自动生成的方法存根
        super.onDestroy();
        unbindService(mSc);
    }

    private void bindBeaconService()
    {
        mSc = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                mService = IAnwiefeHTService.Stub.asInterface(service);
                init();
                Toast.makeText(MainActivity.this, "Service connected", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                Toast.makeText(MainActivity.this, "Service disconnected", Toast.LENGTH_LONG).show();
            }
        };

        Intent intent = new Intent("com.anweife.htsensor.MainService");
        intent.setPackage(this.getPackageName());

        //绑定iScan服务
        bindService(intent, mSc, Context.BIND_AUTO_CREATE);

        //开始iScan服务
        startService(intent);
    }

    private void getRequiredPermissions() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, PERMISSION_COARSE_LOCATION);
        }
    }

    public static void verifyStoragePermissions(Activity activity) {
// Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        if (permission != PackageManager.PERMISSION_GRANTED) {
// We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
        }
    }


    private void init()
    {
        this.getRequiredPermissions();
        this.verifyStoragePermissions(this);

        //test
//        Log.i("gggggggggggggggga","dddddddddddddddddddddd");
//        try {
//            //mService.putDB("test1","qwermxhjfiotkls");
//            Log.i("aaaaaaaa",mService.getDB("test1"));
//        } catch (RemoteException e) {
//            e.printStackTrace();
//        }

        mWebView.addJavascriptInterface(new AndroidtoJs(mService), "AndroidObj");
        mWebView.loadUrl("file:///android_asset/login.html");
        //test
    }

    private void hideStatusBar() {
        if (Build.VERSION.SDK_INT < 16) {
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
        } else {
            View decorView = getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
            decorView.setSystemUiVisibility(uiOptions);
            getSupportActionBar().hide();
        }
    }

}
