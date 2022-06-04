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
import React, {useState, useEffect} from 'react';
import AppColors from '../../Constaint/AppColors';
import Backbtn from '../../Componants/Backbtn';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formateDate} from '../../utils/helper';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CommentsScreen = props => {
  const postData = props.route.params.postData;
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [commentsData, setCommentsData] = useState();

  const commentPost = async (postId, post, text) => {
    var list = [];

    // console.log(text);

    var comment = {
      commentedby: firestore().collection('Users').doc(state.email),
      commentid: generateString(8),
      text,
    };

    setMessage('');

    list = [...post.comments, comment];
    // console.log(list);

    try {
      await firestore()
        .collection('Posts')
        .doc(postId)
        .update({comments: list});

      var list2 = [];
      posts &&
        posts.length > 0 &&
        posts.map(post => {
          if (post.id == postId) {
            post.comments = list;
          }
          list2.push(post);
        });
      setPosts(list2);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommentPost = async (postId, post, commentid) => {
    var list = [];

    list = post.comments.filter(comment => comment.commentid != commentid);

    // console.log(list);

    try {
      await firestore()
        .collection('Posts')
        .doc(postId)
        .update({comments: list});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (postData.comments.length > 0) {
      setisDataAvailable(true);
      setCommentsData(postData.comments);
      // console.log(commentsData);
      //commentsData.map(item => console.log('text', item.text));
    } else {
      setisDataAvailable(false);
    }
  }, [commentsData]);
  console.log(postData);
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
        {isDataAvailable ? (
          <View>
            {commentsData &&
              commentsData.length > 0 &&
              commentsData.map((item, index) => (
                <View key={index} style={{padding: 12}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{uri: item.commentedby.image}}
                      style={{height: 40, width: 40, borderRadius: 20}}
                    />
                    <Text style={[styles.name, {marginStart: '3%'}]}>
                      {item.commentedby.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginStart: '10%',
                      paddingHorizontal: '5%',
                      backgroundColor: AppColors.bottomBg,
                      borderRadius: 5,
                      paddingVertical: '2%',
                    }}>
                    <Text style={[styles.name]}>{item.text}</Text>
                  </View>
                </View>
              ))}
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '70%',
            }}>
            <Text style={[styles.name, {fontSize: 23}]}>No Any Comments</Text>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={c => setComment(c)}
          placeholder="Write Your Comments "
        />
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
