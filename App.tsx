/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { JSXElementConstructor } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules, Button
} from 'react-native';

console.log("Available Native Modules:", NativeModules);
const { CameraModule } = NativeModules;

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  
  const openCamera = () => {
    if (CameraModule && CameraModule.openCamera) {
      CameraModule.openCamera();
    } else {
      console.error("CameraModule is not available");
    }
  };
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          
       
        <View>
        <Text>Simple Camera App</Text>
        <Text>Simple Camera App</Text>
        <Text>Simple Camera App</Text>
        <Text>Simple Camera App</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Open Camera" onPress={openCamera} />
          </View> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
