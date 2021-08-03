import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DetailsBar from "./components/SideBar/Bar/DetailBar/DetailBar";
import HistoryBar from "./components/SideBar/Bar/HistoryBar/HistoryBar";
import TryAgain from "./components/TestContainer/TryAgain/TryAgain";
import TypingChallenge from "./components/TestContainer/TypingChallenge/TypingChallenge";
import randomSelector from "./helper/randomSelector";
import typingTestData from "./data/exampleText";
import ParagraphContext from "./contexts/paragraphContext";
import Detailscontext from "./contexts/detailscontext";
import paraSlicer from "./helper/slicer";
import wordMatchChecker from "./helper/wordMatchChecker";
import "./App.css";

const App = () => {
  // const defaultDetails = {
  //   wpm: 0,
  //   keystrokes: 0,
  //   accuracy: 0,
  //   correct: 0,
  //   misspelled: 0,
  // };

  const [timerStarted, setTimerStarted] = useState(false);
  const [firstWordIndexChecker, setFirstWordIndexChecker] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60);

  const [wpm, setWpm] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [misspelled, setMisspelled] = useState(0);
  


  const [paragraphArray, setParagraphArray] = useState([]);
  const [activeParagraphArray, setActiveParagraphArray] = useState([]);
  const [activeParagraph, setActiveParagraph] = useState("");


  const [typingWord, setTypingWord] = useState("");

  const [wordIndex, setWordIndex] = useState(0);
  const [slicerIndex, setSlicerIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState("")


  const activeParaHandler = () => {

    

  }

  const activeParagraphLoader = () => {
    let [slicedParagraph, index] = paraSlicer(paragraphArray,slicerIndex);
    setActiveParagraph(slicedParagraph.join(" "));
    setSlicerIndex(index);
    
  
  }

  const wordMatchHandler = (event) => {
    setTypingWord(event.target.value);
  };



  const onKeyPressWordMatch = (event) => {

    if (event.charCode === 32) {

      setWordIndex((prevIndex, currnetIndex) => prevIndex + 1);

      setTypingWord("");

      setSelectedWord(paragraphArray[wordIndex+1])

    

      let matchingIssues = wordMatchChecker(selectedWord, typingWord);

      if(matchingIssues) setCorrect((prevCorrect, nextCorrect) => nextCorrect = prevCorrect+1)
      
    
    }

  };


  useEffect(() => {
    
    if(wordIndex % 15 === 0 && wordIndex > 0){
      
      
      activeParagraphLoader();

    } 
  },[wordIndex])
  


  useEffect(() => {
    
    setParagraphArray( randomSelector(typingTestData).split(" "));
    
    
    
  },[])


  useEffect(()=>{



  },[])


  useEffect(() => {

    let spannedWords = paragraphArray.map((word, index) => (
      <span key={index} className="text-2xl">{word}{" "}</span>
    ));

    // let spannedPara = spannedWords.reduce(
    //   (spannedparagraph, currentWord, index) => {
    //     if (spannedparagraph === "") return currentWord.props.children;
    //     return spannedparagraph + " " + currentWord.props.children;
    //   },
    //   ""
    // );
    
    console.log(spannedWords)
    
  setActiveParagraphArray(spannedWords);

   setTimeout(() => {

      setSelectedWord(paragraphArray[0])
      activeParagraphLoader();

    },1000)
  },[paragraphArray])


  return (
    <div className="h-screen">
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-9 gap-2  mx-4 p-4 mt-4 challengeArea">
        <div className="col-span-2 p-8 border-4 ">
          <Detailscontext.Provider value={correct}>
            <DetailsBar />
          </Detailscontext.Provider>
         
        </div>
        <div className="col-span-5 min-width border-4 pt-8 ">
          <ParagraphContext.Provider
            value={{
              onKeyPressWordMatch,
              typingWord,
              wordMatchHandler,
              activeParagraph,
              activeParaHandler,
            }}
          >
            <TypingChallenge />
          </ParagraphContext.Provider>
        </div>
        <div className="col-span-2 p-8 border-4 ">
          <HistoryBar />
        </div>
      </div>
      <div className=" mx-4 p-4">
        <Footer>{activeParagraphArray}</Footer>
      </div>
    </div>
  );
};

export default App;
