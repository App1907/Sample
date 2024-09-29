import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Modal, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { request, PERMISSIONS, openSettings } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Ankit Kumar');
  const [username, setUsername] = useState('Matthew_13');
  const [birthday, setBirthday] = useState('10/10/1998');
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('7888 955 435');
  const [email, setEmail] = useState('hcankit7@gmail.com');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [profileImage, setProfileImage] = useState(null); 

  const handleUpdate = () => {
    if (!name || !username || !birthday || !phoneNumber || !email) {
      alert('Please fill out all the fields');
      return;
    }
    alert('Profile Updated');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeExitModal = () => {
    setIsModalVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString(); 
    setBirthday(formattedDate);
    hideDatePicker();
  };




  // Function to handle selecting an image from the gallery
  const openGallery = async () => {
    try {
      const permission = 
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
          // : await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

          : await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

      if (permission === 'granted') {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        })
        .then(image => {
          setProfileImage({ uri: image.path });
          closeExitModal();
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
          setProfileImage({ uri: image.path });
          closeExitModal();
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Profile</Text>
        </View>



        <View style={styles.profileContainer}>
          {/* Display the selected profile image */}
          {profileImage ? (
            <Image style={styles.profileImage} source={profileImage} />
          ) : (
            <Image style={styles.profileImage} source={require('../../assets/images/profile.png')} />
          )}


          <View style={styles.profileTextContainer}>
            <Text style={styles.label}>Profile Picture</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>



        {/* Rest of the input fields remain the same */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>




        {/* Other inputs like Username, Birthday, Phone, Email, etc. */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
        </View>



        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birthday</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.birthdayContainer}>
            <TextInput
              style={styles.inputWithIcon}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="MM/DD/YYYY"
              editable={false} 
            />
            <Image
              source={require('../../assets/images/calendar.png')}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View> */}


<View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Gender</Text>
  <View style={styles.pickerContainer}>
    <RNPickerSelect
      onValueChange={(value) => setGender(value)}
      value={gender}
      items={[
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ]}
      style={pickerSelectStyles}
    />
  </View>
</View>


        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <Image source={require('../../assets/images/flag.png')} style={styles.flagIcon} />
              <Text style={styles.countryCode}>+1</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
            />
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email ID</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.inputWithButton}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
            <TouchableOpacity>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Profile Photo</Text>

              {/* Modal option to select image from gallery */}
              <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
                <Image source={require('../../assets/images/gallery.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Upload from Gallery</Text>
                <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
              </TouchableOpacity>

              {/* Modal option to use camera */}
              <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
                <Image source={require('../../assets/images/camera.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Use Camera</Text>
                <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={closeExitModal}>
                <Image source={require('../../assets/images/avatar.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Select an Avatar</Text>
                <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
};


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 48,
    height: 48,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 80,
    //justifyContent: 'center',
    //alignItems: 'center',
    //textAlign: 'center',
    color: '#0B152D',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginRight: 20,
  },
  profileTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 5,
  },
  changePhotoText: {
    color: '#FF00B8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#7D7D7D',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
  },
  inputWithIcon: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    paddingRight: 45,
  },
  birthdayContainer: {
    justifyContent: 'center',
  },
  inputIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 15,
  },
  pickerContainer: {
      //height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    //justifyContent: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 15,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    marginLeft: 10,
    paddingRight: 70, 
  },
  changeText: {
    color: '#FF00B8',
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
  },
  inputWithButton: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    paddingRight: 70,
  },
  verifyText: {
    color: '#FF00B8',
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
  },
  updateButton: {
    backgroundColor: '#0000FF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    //width: 428,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#F6F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modalIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  modalOptionText: {
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});

export default EditProfileScreen;
