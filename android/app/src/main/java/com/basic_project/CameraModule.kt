package com.basic_project

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

class CameraModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var imageUri: Uri? = null
    private var promise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun openCamera(promise: Promise) {
        val currentActivity: Activity? = currentActivity
        currentActivity?.let {
            this.promise = promise
            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

            try {
                val photoFile: File = createImageFile()
                imageUri = FileProvider.getUriForFile(
                    it,
                    "${it.packageName}.provider",
                    photoFile
                )
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri)
                it.startActivityForResult(cameraIntent, 1)
            } catch (e: IOException) {
                promise.reject("ERROR", "Could not create image file: ${e.localizedMessage}")
            }
        } ?: run {
            promise.reject("ERROR", "Activity is null")
        }
    }

    private fun createImageFile(): File {
        val timeStamp: String = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val storageDir: File? = currentActivity?.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        return File.createTempFile(
            "JPEG_${timeStamp}_",
            ".jpg",
            storageDir
        )
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == 1) {
            if (resultCode == Activity.RESULT_OK) {
                imageUri?.let {
                    promise?.resolve(it.toString())
                } ?: run {
                    promise?.reject("ERROR", "Image URI is null")
                }
            } else {
                promise?.reject("CANCELLED", "User cancelled image capture")
            }
        }
    }

    override fun onNewIntent(intent: Intent?) {}
}
