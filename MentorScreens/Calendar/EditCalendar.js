import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import AppColors from '../../Constaint/AppColors';
import Backbtn from '../../Componants/Backbtn';
import LinearGradient from 'react-native-linear-gradient';
import CustomBtn from '../../Componants/CustomBtn';
import {useNavigation} from '@react-navigation/native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const EditCalendar = () => {
  const [workingHour, setworkingHour] = useState(true);
  const [calendar, setCalendar] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(true);
  const [tuesday, setTuesday] = useState(true);
  const [wednesday, setWednesday] = useState(true);
  const [thrusday, setThrusday] = useState(true);
  const [friday, setFriday] = useState(true);
  const [satuarday, setSatuarday] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Backbtn
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Availability</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '2%',
          paddingVertical: '3%',
          marginTop: '4%',
          marginHorizontal: '2%',
          borderBottomColor: AppColors.CardColor,
          borderBottomWidth: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomBtn
          Title="Working hours"
          style={styles.btn}
          TextStyle={{
            color: workingHour ? 'red' : AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}
          onPress={() => {
            setworkingHour(true);
            setCalendar(false);
          }}
        />
        <CustomBtn
          Title="Calendar"
          style={styles.btn}
          TextStyle={{
            color: calendar ? 'red' : AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}
          onPress={() => {
            setworkingHour(false);
            setCalendar(true);
          }}
        />
      </View>
      {workingHour ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={sunday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setSunday(previousState => !previousState);
              }}
              value={sunday}
            />
            <Text style={{color: AppColors.FontsColor}}>Sunday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {sunday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={monday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setMonday(previousState => !previousState);
              }}
              value={monday}
            />
            <Text style={{color: AppColors.FontsColor}}>Monday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {monday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={tuesday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setTuesday(previousState => !previousState);
              }}
              value={tuesday}
            />
            <Text style={{color: AppColors.FontsColor}}>Tuesday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {tuesday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={wednesday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setWednesday(previousState => !previousState);
              }}
              value={wednesday}
            />
            <Text style={{color: AppColors.FontsColor}}>Wednesday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {wednesday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={thrusday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setThrusday(previousState => !previousState);
              }}
              value={thrusday}
            />
            <Text style={{color: AppColors.FontsColor}}>Thrusday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {thrusday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={friday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setFriday(previousState => !previousState);
              }}
              value={friday}
            />
            <Text style={{color: AppColors.FontsColor}}>Friday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {friday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '8%',
              justifyContent: 'space-evenly',
            }}>
            <Switch
              trackColor={{false: '#767577', true: AppColors.ActiveColor}}
              thumbColor={satuarday ? 'green' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setSatuarday(previousState => !previousState);
              }}
              value={satuarday}
            />
            <Text style={{color: AppColors.FontsColor}}>Satuarday</Text>
            <LinearGradient
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -0.7, y: 1.3}}
              end={{x: 1, y: 0.5}}
              style={styles.Container}>
              {satuarday ? (
                <Text style={{color: AppColors.ActiveColor}}>
                  9:00am-5:00pm
                </Text>
              ) : (
                <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
              )}
            </LinearGradient>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.headerTitle}>Here Write code For Calendar</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  headerTitle: {
    color: AppColors.FontsColor,
    marginStart: '5%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6%',
    width: Width / 2,
    paddingVertical: '3%',
    borderRadius: 20,
  },
  btn: {
    width: Width / 2.3,
    paddingVertical: 7,
  },
  btntext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});
export default EditCalendar;
