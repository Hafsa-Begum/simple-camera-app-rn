package com.basic_project

import android.app.Activity
import android.content.Intent
import android.provider.MediaStore
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CameraModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun openCamera() {
        val currentActivity: Activity? = currentActivity
        currentActivity?.let {
            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            it.startActivityForResult(cameraIntent, 1)
        }
    }
}
