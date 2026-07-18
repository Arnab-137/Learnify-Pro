# Learnify Elite Android

The Android app is a Capacitor wrapper around the same frontend used by the website. It bundles the frontend for fast startup and connects to the existing Render API and MongoDB database.

## Build locally

Install Android Studio with its SDK and Java 21, then run:

```powershell
npm.cmd ci
npm.cmd run mobile:open
```

Android Studio can run the app on a phone or emulator and create signed Play Store builds.

## Download the free test APK

Open the repository's **Actions** tab, select **Build Android APK**, run the workflow, then download the **Learnify-Elite-Android** artifact. Extract the ZIP and install `app-debug.apk` on an Android device.

The test APK is Android-debug signed. A Play Store release must be signed with a private release key owned and backed up by the publisher.
