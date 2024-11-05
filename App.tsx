/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React, { useState } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   NativeModules,
   Button,
   Image,
   PermissionsAndroid, 
   Platform, 
   Alert
 } from 'react-native';
 
 const { CameraModule } = NativeModules;

 async function requestCameraPermission() {
   if (Platform.OS === 'android') {
     try {
       const granted = await PermissionsAndroid.requestMultiple([
         PermissionsAndroid.PERMISSIONS.CAMERA,
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
       ]);
 
       if (
         granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
         granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
         granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
       ) {
         return true;
       } else {
         Alert.alert("Permissions Denied", "Camera and storage permissions are required to use the camera.");
         return false;
       }
     } catch (err) {
       console.warn("Permission request error:", err);
       return false;
     }
   }
   return true;
 }
 

 
 function App() {
   const isDarkMode = useColorScheme() === 'dark';
   const [imageUri, setImageUri] = useState('');
 
   const openCamera = async () => {
    // const hasPermission = await requestCameraPermission();
    // if (!hasPermission) {
    //   console.warn("Camera permission denied");
    //   return;
    // }
  
    try {
      if (CameraModule && CameraModule.openCamera) {
        const uri = await CameraModule.openCamera();
        console.log("Captured image URI:", uri);
        // const base64Data = await RNFS.readFile(uri, 'base64');
        // setImageBase64(`data:image/jpeg;base64,${base64Data}`);
        // setImageUri(`data:image/jpeg;base64,${base64Data}`);
        setImageUri(uri);
      } else {
        console.error("CameraModule is not available");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <View style={styles.header}>
           <Text style={styles.title}>Simple Camera App</Text>
         </View>
         <View style={styles.buttonContainer}>
           <Button title="Open Camera" onPress={openCamera} />
         </View>
         {imageUri && (
           <View style={styles.imageContainer}>
             <Text>Captured Image:</Text>
             <Image source={{ uri: imageUri }} style={styles.image} />
           </View>
         )}
         {/* <Text>Image show</Text> */}
       </ScrollView>
     </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   header: {
     padding: 20,
     alignItems: 'center',
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
   },
   buttonContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 20,
   },
   imageContainer: {
     alignItems: 'center',
     marginTop: 20,
     
   },
   image: {
     width: 300,
     height: 300,
    //  resizeMode: 'contain',
   },
 });
 
 export default App;
 