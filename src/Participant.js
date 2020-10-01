import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from "react-native-twilio-video-webrtc";

const Participant = ({ participant, token }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

    

  // set the video and audio tracks in the state and set up listeners to the participant object for when tracks are added or removed.
  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    // set up listeners to the trackSubscribed and trackUnsubscribed events using the functions we just wrote.
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    // then do the cleanup in the returned function
    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  // attach the video and audio tracks to the DOM, 
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      console.log(videoTrack)
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  // useEffect(() => {
  //   try {
  //     videoRef.connect({
  //       roomName:'Test Room',
  //       accessToken: token
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <View className="participant">
      <Text>{participant.identity}</Text>
      {/* <video ref={videoRef} autoPlay={true} /> */}
      {/* <TwilioVideo ref={videoRef} /> */}
      {/* <audio ref={audioRef} autoPlay={true} muted={true} /> */}
    </View>
  );
};

export default Participant;