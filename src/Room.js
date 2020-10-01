import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  // This uses the token and roomName to connect to the Twilio Video service.
  useEffect(() => {
    // const participantConnected = participant => {
    //   setParticipants(prevParticipants => [...prevParticipants, participant]);
    // };
    // const participantDisconnected = participant => {
    //   setParticipants(prevParticipants =>
    //     prevParticipants.filter(p => p !== participant)
    //   );
    // };
    // Video.connect(token, {
    //   name: roomName
    // }).then(room => {
    //   setRoom(room);
    //   room.on('participantConnected', participantConnected);
    //   room.on('participantDisconnected', participantDisconnected);
    //   room.participants.forEach(participantConnected);
    // });

    // stops all the local partipant's tracks and then disconnects from the room, if the local participant is connected:
    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  return (
    <View className="room">
      <Text>Room: {roomName}</Text>
      <Button
        onPress={handleLogout}
        title="Log out"
      />
      <View className="local-participant">
        {/* {room && (
          <Participant
            key={room.localParticipant.sid}
            // token={token}
            participant={room.localParticipant}
          />) } */}
      </View>
      <Text>Remote Participants</Text>
      <View className="remote-participants">{remoteParticipants}</View>
    </View>
  );
};

export default Room;