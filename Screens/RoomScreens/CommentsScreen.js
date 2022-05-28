import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AppColors from '../../Constaint/AppColors';
import Backbtn from '../../Componants/Backbtn';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CommentsScreen = props => {
  const postData = props.route.params.postData;
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  console.log(postData.comments, 'posts');
  return (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Backbtn
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Comments</Text>
      </View>
      <View
        style={{
          paddingHorizontal: '10%',
          paddingVertical: '3%',
          borderBottomColor: AppColors.BtnClr,
          borderBottomWidth: 2,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.dp} source={{uri: postData.postedby.image}} />
          <View style={{marginStart: '3%'}}>
            <Text style={styles.name}>{postData.postedby.name}</Text>
            <Text style={styles.company}>{postData.postedby.designation}</Text>
          </View>
        </View>
        <Text style={styles.postText}>{postData.text}</Text>
      </View>
      <View>
        <FlatList
          data={postData.comments}
          renderItem={(item, index) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Text style={styles.name}>{item.comments.commentedby.name}</Text> */}
              <Text>{item.text}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Write Your Comments " />
        <TouchableOpacity>
          <Icon name="send" color={AppColors.ActiveColor} size={28} />
        </TouchableOpacity>
      </View>
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
    marginStart: '10%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
  },
  postText: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginStart: '16%',
    marginTop: '3%',
  },
  dp: {
    height: Height / 14,
    width: Width / 7,
    borderRadius: 56,
  },
  name: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
  },
  company: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: AppColors.BtnClr,
    borderRadius: 9,
    bottom: 5,
    height: Height / 14,
    paddingHorizontal: '3%',
  },
  input: {
    width: '92%',
    height: '100%',
    color: AppColors.primarycolor,
    fontFamily: 'Poppins-Regular',
  },
});
export default CommentsScreen;
