import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import HeaderLayout from '../HomeScreens/HeaderLayout';
import SwipeCard from '../../Componants/SwipeCard';
import {courseData} from '../../dummy-data/courseData';
import AppColors from '../../Constaint/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CourseContext} from '../../App';
import Backbtn from '../../Componants/Backbtn';
import {useNavigation} from '@react-navigation/native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Courses = props => {
  const courseData = props.route.params.courseData;
  const navigation = useNavigation();
  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.primarycolor}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Backbtn
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Saved Courses</Text>
      </View>
      <View>
        <SwipeCard
          data={courseData}
          pagingEnabled={false}
          maxString={30}
          style={styles.popularCard}
          overlay={{
            top: 150,
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            height: '100%',
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: Height > 684 ? 140 : 90,
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
  },
  Btn: {
    width: '85%',
    marginTop: '3%',
    justifyContent: 'space-between',
    height: '10%',
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.FontsColor,
  },
  alertSection: {
    alignItems: 'center',
    borderTopColor: AppColors.BtnClr,
    borderBottomColor: AppColors.BtnClr,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    marginTop: '5%',
    paddingVertical: '7%',
    marginHorizontal: '4%',
  },
  popularCard: {
    width: Width / 2.1,
    height: Height > 684 ? Height / 4 : Height / 5,
  },
  headerTitle: {
    color: AppColors.FontsColor,
    marginStart: '23%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});
export default Courses;