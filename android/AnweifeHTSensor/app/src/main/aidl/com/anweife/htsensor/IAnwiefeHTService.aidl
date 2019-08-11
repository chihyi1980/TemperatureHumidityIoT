// IAnwiefeHTService.aidl
package com.anweife.htsensor;

// Declare any non-default types here with import statements

interface IAnwiefeHTService {
    /**
     * Demonstrates some basic types that you can use as parameters
     * and return values in AIDL.
     */
    void startCron();
    void startScan();
    void putDB(String key, String value);
    String getDB(String key);
    String keySearch(String key);
    String isExist(String key);
    void del(String key);
    String getSN();

}
