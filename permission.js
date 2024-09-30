// Function to handle selecting an image from the gallery
  const openGallery = async () => {
    try {
      const permission = 
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
          : await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

      if (permission === 'granted') {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        })
        .then(image => {
          setProfileImage({ uri: image.path }); // Set profile image
          closeExitModal(); // Close modal
        })
        .catch(error => {
          Alert.alert('Error', 'Unable to open gallery');
        });
      } else {
        Alert.alert('Permission Denied', 'Please enable gallery access from settings.');
        openSettings();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request permission.');
    }
  };

  // Function to handle opening the camera
  const openCamera = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.CAMERA)
          : await request(PERMISSIONS.ANDROID.CAMERA);

      if (permission === 'granted') {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        })
        .then(image => {
          setProfileImage({ uri: image.path }); // Set profile image
          closeExitModal(); // Close modal
        })
        .catch(error => {
          Alert.alert('Error', 'Unable to open camera');
        });
      } else {
        Alert.alert('Permission Denied', 'Please enable camera access from settings.');
        openSettings();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request permission.');
    }
  };














const openGallery = async () => {
  try {
    const permission = 
      Platform.OS === 'ios'
        ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        : await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

    if (permission === 'granted') {
      try {
        const image = await ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        });
        setProfileImage({ uri: image.path }); // Set profile image
        closeExitModal(); // Close modal
      } catch (error) {
        Alert.alert('Error', 'Unable to open gallery');
      }
    } else {
      Alert.alert('Permission Denied', 'Please enable gallery access from settings.');
      if (openSettings) {
        openSettings();
      }
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to request permission.');
  }
};
