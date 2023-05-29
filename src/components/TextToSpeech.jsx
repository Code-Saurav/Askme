import { useEffect } from "react";
import { ResponsiveVoice } from 'responsivevoice';


const TextToSpeech = ({ speechText }) => {
  useEffect(() => {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance();

    utterance.text = speechText;
    utterance.voice = synth.getVoices().find((voice) => voice.lang === 'en-US');
    utterance.rate = 0.9; // Adjust the speaking rate
    synth.speak(utterance);

   
    return () => {
      synth.cancel();
     
    };
  }, [speechText]);
};

export default TextToSpeech;
