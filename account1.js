import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Modal, Alert, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { request, PERMISSIONS, openSettings } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
          <View style={styles.personConatiner}>
            {/* Display the selected profile image */}
            {profileImage ? (
              <Image style={styles.profileImage} source={profileImage} />
            ) : (
              <Image style={styles.profileImage} source={require('../../assets/images/profile.png')} />
            )}
          </View>


          <View style={styles.profileTextContainer}>
            <Text style={styles.label}>Profile Picture</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>




        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            label={'Name'}
            //placeholder="Name"
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
            // theme={{roundness:30}}
            // outlineStyle={{
            //   display: 'none',
            // }}
            theme={{
              colors:{
              primary:"#7F879A",
              }
            }}
          />
        </View>





        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            label={'Username'}
            //placeholder="Name"
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
            //placeholder="Username"
            underlineStyle={{
              display: 'none',
            }}
            theme={{
              colors:{
              primary:"#7F879A",
              }
            }}
          />
        </View>



        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birthday</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.birthdayContainer}>
            <TextInput
              style={styles.inputWithIcon}
              value={birthday}
              onChangeText={setBirthday}
              label={'Birthday'}
            //placeholder="Name"
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
              //placeholder="MM/DD/YYYY"
              editable={true}
              underlineStyle={{
                display: 'none',
              }}
              theme={{
                colors:{
                primary:"#7F879A",
                }
              }}
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
              editable={true}
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
              label={'Phone Number'}
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
              //placeholder="Phone Number"
              // underlineStyle={{
              //   display: 'none',
              // }}
              theme={{
                colors:{
                primary:"#7F879A",
                }
              }}
            />
            <TouchableOpacity style={styles.changeButton}>
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
              label={'Email ID'}
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
              //placeholder="Email ID"
              // underlineStyle={{
              //   display: 'none',
              // }}
              theme={{
                colors:{
                primary:"#7F879A",
                }
              }}
            />
            <TouchableOpacity style={styles.verifyButton}>
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
              <View style={styles.line} />

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
    //width: windowWidth * 0.85981308411,
    height: windowHeight * 0.06322444678,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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
  personConatiner: {
    backgroundColor: '#E1EBFE',
    borderRadius: 100,
    width: 120,
    height: 120,
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
    fontWeight: '450',
    color: '#4B5879',
    marginLeft: 20,
    marginBottom: 5,
  },
  changePhotoText: {
    color: '#FF00B8',
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    //width: 368,
    //height: 60,
    //marginTop: windowHeight * 0.00084826132,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#7F879A',
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#E8E8E8',
    // //padding: 15,
    // fontSize: 16,
    // backgroundColor: '#F7F7F7',
    backgroundColor: '#FFFFFF',
    //width: windowWidth * 0.85981308411,
    height: windowHeight * 0.06322444678,
    marginBottom: windowHeight * 0.01028977871,
    borderRadius: 16,
    borderColor: '#E7EBF3',
  },
  inputWithIcon: {
    flex: 1,
    //padding: 15,
    fontSize: 16,
    height: windowHeight * 0.06322444678,
    //borderWidth: 1,
    borderColor: '##E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    //justifyContent: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    height: windowHeight * 0.06322444678,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    borderColor: '#E7EBF3',
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
    //padding: 15,
    //width: windowWidth * 0.85981308411,
    // borderWidth: 1,
    fontSize: 16,
    height: windowHeight * 0.06322444678,
    // marginBottom: windowHeight * 0.01028977871,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    paddingRight: 70,
  },
  changeButton: {
    justifyContent: 'center',
  },
  changeText: {
    color: '#FF00B8',
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
  },
  inputWithButton: {
    flex: 1,
    //padding: 15,
    // borderWidth: 1,
    fontSize: 16,
    //width: windowWidth * 0.85981308411,
    height: windowHeight * 0.06322444678,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingRight: 70,
  },
  verifyButton: {
    justifyContent: 'center',
  },
  verifyText: {
    color: '#FF00B8',
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
  },
  updateButton: {
    backgroundColor: '#000080',
    borderRadius: 16,
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
    //width: '100%',
    //height: 400,
    width: windowWidth,
    height: windowHeight * 0.44151738672,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30.36,
    marginTop: 10,
    //marginBottom: 20,
  },
  line:
  {
    width: windowWidth * 0.88785046729,
    height: 1,
    backgroundColor: '#E6E9F3',
    marginTop: windowHeight * 0.02107481559,
    marginBottom: windowHeight * 0.02107481559,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#F6F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginBottom: 15,
  },
  modalIcon: {
    width: 30,
    height: 30,
    marginLeft: 14,
    marginRight: 20,
  },
  modalOptionText: {
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    width: 4,
    height: 8,
    marginRight: 18,
  },
});

export default EditProfileScreen;
