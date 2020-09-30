import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <View >
      <Text>Enter a room</Text>
      <View>
        <Text htmlFor="name">Name:</Text>
        <TextInput
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </View>

      <View>
        <Text htmlFor="room">Room name:</Text>
        <TextInput
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </View>
      <Button
        onPress={handleSubmit}
        title="submit"
      />
    </View>
  );
};

export default Lobby;