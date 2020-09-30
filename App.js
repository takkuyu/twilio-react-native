import React from 'react';
// import './App.css';
import VideoChat from './src/VideoChat';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
const App = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text>Video Chat with Hooks</Text>
      </View>
      <View>
        <VideoChat />
      </View>
      <View>
        <Text>
          Made with{' '}
          <Text role="img" aria-label="React">
            ⚛
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#333e5a',
    marginTop: 50
  },
  Header:{
    backgroundColor: '#f0293e',
    color: '#fff',
    textAlign: 'center',
    flexGrow: 0,
    marginBottom: 32
  },
})

export default App;