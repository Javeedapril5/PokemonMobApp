// LocationModule.kt

package com.yourappname.com.awesomeproject

import android.content.Context
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import com.facebook.react.bridge.*

class LocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val locationManager: LocationManager by lazy {
        reactApplicationContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
    }

    override fun getName(): String {
        return "LocationModule"
    }

    @ReactMethod
    fun getCurrentLocation(promise: Promise) {
        if (!isLocationEnabled()) {
            promise.reject("LOCATION_NOT_ENABLED", "Location services are not enabled.")
            return
        }

        val locationListener = object : LocationListener {
            override fun onLocationChanged(p0: Location) {
                p0.let {
                    val data = WritableNativeMap().apply {
                        putDouble("latitude", p0.latitude)
                        putDouble("longitude", p0.longitude)
                    }
                    promise.resolve(data)
                    locationManager.removeUpdates(this)
                }
            }

//            override fun onLocationChanged(locations: MutableList<Location>) {
//                locations.let {
//                    val data = WritableNativeMap().apply {
//                        putDouble("latitude", locations.latitude)
//                        putDouble("longitude", locations.longitude)
//                    }
//                    promise.resolve(data)
//                    locationManager.removeUpdates(this)
//                }
//            }

            override fun onProviderDisabled(provider: String) {}
            override fun onProviderEnabled(provider: String) {}
            override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
        }

        try {
            locationManager.requestSingleUpdate(LocationManager.NETWORK_PROVIDER, locationListener, null)
        } catch (e: SecurityException) {
            promise.reject("PERMISSION_DENIED", "Location permission denied.")
        }
    }

    private fun isLocationEnabled(): Boolean {
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
    }
}
