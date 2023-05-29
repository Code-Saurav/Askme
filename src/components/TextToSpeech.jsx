import React from "react";
import { useState, useEffect } from "react";

import Speech from "react-speech";

const TextToSpeech = ({ speechText }) => {
  useEffect(() => {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance();

    utterance.text = speechText;
    utterance.voice = synth.getVoices()[1]; // Select a specific voice
    utterance.rate = 0.8; // Adjust the speaking rate
    synth.speak(utterance);

    return () => {
      synth.cancel();
    };
  }, [speechText]);
};

export default TextToSpeech;
