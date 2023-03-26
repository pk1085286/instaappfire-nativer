import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase with your project configuration
firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
});

// Sign up a new user
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // User successfully created, do something with the user object
    const user = userCredential.user;
  })
  .catch((error) => {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
  });

// Log in an existing user
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // User successfully logged in, do something with the user object
    const user = userCredential.user;
  })
  .catch((error) => {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
  });

// Log out the current user
firebase.auth().signOut()
  .then(() => {
    // User successfully logged out
  })
  .catch((error) => {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
  });


  import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the posts from Firestore
    const unsubscribe = firebase.firestore().collection('posts')
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(data);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
            <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
            <Text>{item.caption}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;


import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const


import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'PROFILE_PICTURE_URL' }} style={styles.profilePicture} />
      <Text style={styles.username}>USERNAME</Text>
      <Text style={styles.bio}>BIO</Text>
      {/* Other profile information */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ProfileScreen;


import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the current user is following the user with the given ID
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.database().ref(`users/${currentUser.uid}/following/${userId}`)
        .once('value')
        .then((snapshot) => {
          setIsFollowing(snapshot.exists());
        });
    }
  }, [userId]);

  const handlePress = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      if (isFollowing) {
        // Unfollow the user with the given ID
        firebase.database().ref(`users/${currentUser.uid}/following/${userId}`).remove()
          .then(() => setIsFollowing(false));
      } else {
        // Follow the user with the given ID
        firebase.database().ref(`users/${currentUser.uid}/following/${userId}`).set(true)
          .then(() => setIsFollowing(true));
      }
    }
  };

  return (
    <Button title={isFollowing ? 'Unfollow' : 'Follow'} onPress={handlePress} />
  );
};

export default FollowButton;


import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the current user is following the user with the given ID
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.database().ref(`users/${currentUser.uid}/following/${userId}`)
        .once('value')
        .then((snapshot) => {
          setIsFollowing(snapshot.exists());
        });
    }
  }, [userId]);

  const handlePress = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      if (isFollowing) {
        // Unfollow the user with the given ID
        firebase.database().ref(`users/${currentUser.uid}/following/${userId}`).remove()
          .then(() => setIsFollowing(false));
      } else {
        // Follow the user with the given ID
        firebase.database().ref(`users/${currentUser.uid}/following/${userId}`).set(true)
          .then(() => setIsFollowing(true));
      }
    }
  };

  return (
    <Button title={isFollowing ? 'Unfollow' : 'Follow'} onPress={handlePress} />
  );
};

export default FollowButton;
