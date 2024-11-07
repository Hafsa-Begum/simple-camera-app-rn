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
   FlatList,
   TouchableOpacity
 } from 'react-native';
 
 const { CameraModule } = NativeModules;
 
 function App() {
   const isDarkMode = useColorScheme() === 'dark';
   const [imageUri, setImageUri] = useState('');
   const [capturedImages, setCapturedImages] = useState([]);
 
   const openCamera = async () => {
  
    try {
      if (CameraModule && CameraModule.openCamera) {
        const uri = await CameraModule.openCamera();
        console.log("Captured image URI:", uri);
        setImageUri(uri);
        setCapturedImages(prevImages => [...prevImages, uri]);
      } else {
        console.error("CameraModule is not available");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };
 
   return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    
    <View style={styles.header}>
      <Text style={styles.title}>Simple Camera App</Text>
    </View>
    
    <View style={styles.buttonContainer}>
      {/* <Button title="Open Camera"  /> */}
      <TouchableOpacity>
        <Text style={styles.buttonText} onPress={()=>openCamera()}>
        Open Camera
        </Text>
      </TouchableOpacity>
    </View>

    {imageUri && (
      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Captured Image:</Text>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    )}

    <View style={styles.imagesContainer}>
      <Text style={styles.imagesTitle}>Photo Album</Text>
      <FlatList
        data={capturedImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.capturedImage} />
        )}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
      />
    </View>
    </ScrollView>
  </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText:{
    color: '#fff',
    backgroundColor: '#4a4a4a',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 6,
    fontSize:16,
    fontWeight: 'bold'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageLabel: {
    fontSize: 16,
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 8
  },
  imagesContainer: {
    padding: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  capturedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  filterOptions: {
    marginVertical: 20,
    alignItems: 'center',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  filterText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#4CAF50',
  },
 });
 
 export default App;
 