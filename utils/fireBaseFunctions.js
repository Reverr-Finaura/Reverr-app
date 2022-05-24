import auth from '@react-native-firebase/auth';
import React, {useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {UserContext} from '../App';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

export const GetUser = async setData => {
  const udata = await auth().currentcUser;
  const savedUser = await firestore()
    .collection('Users')
    .doc(udata.email)
    .get();
  setData(savedUser._data);
};

export const ChangeDp = (loading, setLoading, updateState) => {
  const {state, dispatch} = useContext(UserContext);
  ImagePicker.openPicker({
    mediaType: 'photo',
  }).then(image => {
    try {
      loading;
      const url = image.path;
      const fileUrl = url.substring(url.lastIndexOf('/') + 1);
      storage()
        .ref('Images/' + fileUrl)
        .putFile(url)
        .then(async () => {
          var imgURL = await storage()
            .ref('Images/' + fileUrl)
            .getDownloadURL();
          console.log('url', imgURL);
          setLoading(false);
          updateState({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore()
            .collection('Users')
            .doc(state.email)
            .update({
              image: imgURL,
            })
            .then(() => {
              alert('changed');
              setLoading(false);
            });
        });
    } catch (error) {
      alert('Cancel');
    }
  });
};

export const AddDeckFile = (name, companyName, setFile) => {
  ImagePicker.openPicker({
    mediaType: 'any',
  }).then(file => {
    try {
      loading;
      const url = file.path;
      setFile(url);
      const fileUrl = url.substring(url.lastIndexOf('/') + 1);
      storage()
        .ref('FundingFiles/' + fileUrl)
        .putFile(url)
        .then(async () => {
          const udata = await auth().currentcUser;
          var userEmail = udata.email;
          var deckFile = await storage()
            .ref('FundingFiles/' + fileUrl)
            .getDownloadURL();

          await firestore().collection('Funding').doc(userEmail).set({
            name: name,
            companyName: companyName,
            file: deckFile,
          });
        });
    } catch (error) {
      alert('Cancel');
    }
  });
};

export const AddGalleryImage = setfileUrl => {
  ImagePicker.openPicker({
    mediaType: 'photo',
  }).then(image => {
    try {
      const url = image.path;
      const fileUrl = url.substring(url.lastIndexOf('/') + 1);
      storage()
        .ref('Images/' + fileUrl)
        .putFile(url)
        .then(async () => {
          var imgURL = await storage()
            .ref('Images/' + fileUrl)
            .getDownloadURL();
          setfileUrl(imgURL);
          console.log(imgURL);
          /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
        });
    } catch (error) {
      alert('Cancel');
    }
  });
};
export const AddCameraImage = setfileUrl => {
  ImagePicker.openCamera({
    mediaType: 'photo',
  }).then(image => {
    try {
      const url = image.path;
      const fileUrl = url.substring(url.lastIndexOf('/') + 1);
      storage()
        .ref('Images/' + fileUrl)
        .putFile(url)
        .then(async () => {
          var imgURL = await storage()
            .ref('Images/' + fileUrl)
            .getDownloadURL();
          setfileUrl(imgURL);
          console.log(imgURL);

          /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
        });
    } catch (error) {
      alert('Cancel');
      return null;
    }
  });
};

export const AddGalleryVideo = () => {
  ImagePicker.openPicker({
    mediaType: 'video',
  }).then(image => {
    try {
      const url = image.path;
      const fileUrl = url.substring(url.lastIndexOf('/') + 1);
      storage()
        .ref('Images/' + fileUrl)
        .putFile(url)
        .then(async () => {
          var imgURL = await storage()
            .ref('Images/' + fileUrl)
            .getDownloadURL();
          console.log(imgURL);
          /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
        });
    } catch (error) {
      alert('Cancel');
    }
  });
};
export const AddCameraVideo = () => {
  ImagePicker.openCamera({
    mediaType: 'video',
  }).then(image => {
    try {
      const url = image.path;
      const fileUrl = url.substring(url.lastIndexOf('/') + 1);
      storage()
        .ref('Images/' + fileUrl)
        .putFile(url)
        .then(async () => {
          var imgURL = await storage()
            .ref('Images/' + fileUrl)
            .getDownloadURL();
          // console.log(imgURL);
          return imgURL;
          /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
        });
    } catch (error) {
      alert('Cancel');
      return null;
    }
  });
};

export const GetAllMentors = async setFn => {
  const subscriber = await firestore()
    .collection('Users')
    .onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(documentSnapshot => {
        delete documentSnapshot.data().password;
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setFn(users.filter(y => y.userType == 'Mentor'));
    });
};
export const CreateMessagePath = async (currentcUser, sendTo) => {
  firestore()
    .collection('Messages')
    .doc(currentcUser.email)
    .collection(
      currentcUser && currentcUser.userType == 'Mentor'
        ? 'YourClients'
        : 'YourMentors',
    )
    .doc(sendTo.email)
    .set({messages: []})
    .then(() => {
      firestore()
        .collection('Messages')
        .doc(sendTo.email)
        .collection(
          sendTo && sendTo.userType == 'Mentor' ? 'YourClients' : 'YourMentors',
        )
        .doc(currentcUser.email)
        .set({messages: []});
    });
};

export const SendMessage = (currentcUser, sendTo, message) => {
  firestore()
    .collection('Messages')
    .doc(currentcUser.email)
    .collection(
      currentcUser && currentcUser.userType == 'Mentor'
        ? 'YourClients'
        : 'YourMentors',
    )
    .doc(sendTo.email)
    .update({
      messages: firestore.FieldValue.arrayUnion({
        msg: message,
        createdAt: date + '-' + month + '-' + year,
        sendBy: currentcUser.email,
      }),
    })
    .then(() => {
      firestore()
        .collection('Messages')
        .doc(sendTo.email)
        .collection(
          sendTo && sendTo.userType == 'Mentor' ? 'YourClients' : 'YourMentors',
        )
        .doc(currentcUser.email)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            msg: message,
            createdAt: date + '-' + month + '-' + year,
            sendBy: currentcUser.email,
          }),
        });
    });
};
export const ReciveMessage = async (currentcUser, sendTo, setmsg) => {
  const Allmsg = await firestore()
    .collection('Messages')
    .doc(currentcUser.email)
    .collection(
      currentcUser && currentcUser.userType == 'Mentor'
        ? 'YourClients'
        : 'YourMentors',
    )
    .doc(sendTo.email)
    .get();
  setmsg(Allmsg._data.messages);
};

export const SaveArticle = async (item, email, articles) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedArticles: [...articles, item.id]});
};

export const RemoveArticle = async (item, email, articles) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedArticles: [...articles.filter(arti => arti != item.id)]});
};
export const SavePost = async (item, email, posts) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedPosts: [...posts, item.id]});
};

export const RemovePost = async (item, email, posts) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedPosts: [...posts.filter(arti => arti != item.id)]});
};
export const SaveCourse = async (item, email, courses) => {
  if (courses == undefined) {
    courses = [];
  }
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedCourses: [...courses, item.id]});
};

export const RemoveCourse = async (item, email, courses) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedCourses: [...courses.filter(arti => arti != item.id)]});
};
export const SaveMentor = async (item, email, mentors) => {
  if (mentors == undefined) {
    mentors = [];
  }
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedMentors: [...mentors, item.email]});
};

export const RemoveMentor = async (item, email, mentors) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedMentors: [...mentors.filter(arti => arti != item.email)]});
};
