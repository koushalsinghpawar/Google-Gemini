import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]); // Initialize as an array
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () =>{
    setLoading(false);
    setShowResult(false);
  }
  
  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPreviousPrompt(prev => [...prev, input]); // Update correctly as an array

    try {
      const response = await runChat(input);
      const responseArray = response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          newResponse += "<b>" + responseArray[i] + "</b>";
        } else {
          newResponse += responseArray[i];
        }
      }

      let newResponseWithLineBreaks = newResponse.split("*").join("<br>");
      
      // Typing Effect
      const newResponseArray = newResponseWithLineBreaks.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setLoading(false);
      setInput("");
    } catch (error) {
      console.error("Error fetching response:", error);
      setLoading(false);
    }
  };

  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;





