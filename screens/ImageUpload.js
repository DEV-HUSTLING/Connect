import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({ file, setFile, setError, error }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    header: {
      marginBottom: 16,
    },
    button: {
      backgroundColor: "yellow",
      padding: 6,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonText: {
      color: "green",
      fontSize: 16,
      fontWeight: "bold",
    },
    imageContainer: {
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    errorText: {
      color: "red",
      marginTop: 16,
    },
    uploadedText: {
      color: "green",
      marginTop: 16,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      console.log(result.assets)
      if (!result.canceled) {
        setFile(result.assets[0].uri);
        setError(null);
      } else {
        setError("Image selection cancelled");
      }
    }
  };
  
  return (
    <View
    style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}
    >
    <View style={styles.container}>

      <Text style={styles.header}>Profile Image:</Text>

      
        <View>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        
    </View>
    {file?
          <Image source={{ uri: file }} style={styles.image} />

        :null}
    </View>
  );
};

export default ImageUpload;
