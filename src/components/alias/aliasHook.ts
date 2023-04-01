import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { sampleSize } from "lodash";
import { IRowWordsState, IWordsState, ECommon } from "./types";

const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
const sheet_id = process.env.REACT_APP_GOOGLE_SHEETS_ID;
const sheets_base_url = process.env.REACT_APP_SHEETS_BASE_URL;
const URL = `${sheets_base_url}${sheet_id}/values:batchGet?ranges=Sheet1!A2:Z10000&key=${api_key}`;

const useAlias = () => {
  const [wordsFromSheet, setWordsFromSheet] = useState<IRowWordsState[] | []>(
    []
  );
  const [wordsList, setWordsList] = useState<IWordsState[] | []>([]);
  const [round, setRound] = useState<number>(1);
  const [time, setTime] = useState<number>(60);
  const [timeCopy, setTimeCopy] = useState<number>(60);
  const [turn, setTurn] = useState<string>(ECommon.teamOne);
  const [winner, setWinner] = useState<string>("");
  const [teamOne, setTeamOne] = useState<string>(ECommon.team1);
  const [teamTwo, setTeamTwo] = useState<string>(ECommon.team2);
  const [teamOneCount, setTeamOneCount] = useState<number>(0);
  const [teamTwoCount, setTeamTwoCount] = useState<number>(0);
  const [winningCount, setWinningCount] = useState<number>(50);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMiddleRound, setIsMiddleRound] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [currentPhraseDescription, setCurrentPhraseDescription] =
    useState<string>("");

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleRestartGame = () => {
    setIsGameStarted(false);
    setTime(60);
    setTimeCopy(60);
    setTurn(ECommon.teamOne);
    setWinner("");
    setTeamOne(ECommon.team1);
    setTeamTwo(ECommon.team2);
    setTeamOneCount(0);
    setTeamTwoCount(0);
    setWinningCount(50);
    setIsMiddleRound(false);
    setModalState(false);
    createList();
    setRound(1);
  };

  const handleContinueGame = () => {
    createList();
    setTime(timeCopy);
    setModalState(false);
    setIsMiddleRound(false);
    setTurn(turn === ECommon.teamOne ? ECommon.teamTwo : ECommon.teamOne);
    setCurrentPhraseDescription("");
    setRound((prevRound) => prevRound + 1);
  };

  const handleGameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const value = e.target.value;
    if (name === ECommon.time) {
      setTime(Number(value));
      setTimeCopy(Number(value));
    }
    if (name === ECommon.teamOne) {
      setTeamOne(value);
    }
    if (name === ECommon.teamTwo) {
      setTeamTwo(value);
    }
    if (name === ECommon.winningCount) {
      setWinningCount(Number(value));
    }
  };

  const handleModalState = () => {
    setModalState(!modalState);
    if (modalState) setCurrentPhraseDescription("");
    if (isGameStarted && isMiddleRound) handleContinueGame();
  };

  const handleCurrentDescription = (description: string) => {
    setCurrentPhraseDescription(description);
    handleModalState();
  };

  const createList = () => {
    const randomList = sampleSize(wordsFromSheet, 5);
    const transformToState = randomList.map((word) => {
      return { ...word, isGuessed: false };
    });

    setWordsList(transformToState);
  };

  const handleGuess = (phrase: string) => {
    const toggledStateGuess = wordsList.map((word) => {
      if (word.phrase === phrase) {
        if (turn === ECommon.teamOne) {
          word.isGuessed
            ? setTeamOneCount((prevCount) => prevCount - 1)
            : setTeamOneCount((prevCount) => prevCount + 1);
        }
        if (turn === ECommon.teamTwo) {
          word.isGuessed
            ? setTeamTwoCount((prevCount) => prevCount - 1)
            : setTeamTwoCount((prevCount) => prevCount + 1);
        }

        word.isGuessed ? (word.isGuessed = false) : (word.isGuessed = true);

        return word;
      }

      return word;
    });

    setWordsList(toggledStateGuess);
  };

  const getWordsFromSheet = async () => {
    try {
      const res = await axios.get(URL);
      const wordsFromSheet = res?.data?.valueRanges[0]?.values;
      const reqFormat = [];
      if (!!wordsFromSheet.length) {
        for (const [phrase, description] of wordsFromSheet) {
          reqFormat.push({ phrase, description });
        }
      }
      setWordsFromSheet(reqFormat);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWordsFromSheet();
  }, []);

  useEffect(() => {
    createList();
  }, [wordsFromSheet]);

  useEffect(() => {
    if (isGameStarted && time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
    if (isGameStarted && time === 0) {
      if (!winner) {
        setModalState(true);
        setIsMiddleRound(true);
      }
    }
    if (isGameStarted && time === 0 && round % 2 === 0) {
      let winner;
      const isAboveWinningCount =
        teamOneCount >= winningCount || teamTwoCount >= winningCount;
      winner = teamOneCount > teamTwoCount ? teamOne : teamTwo;
      winner = teamOneCount === teamTwoCount ? ECommon.equalGame : winner;
      if (isAboveWinningCount) {
        setModalState(true);
        setWinner(winner);
        setIsMiddleRound(false);
      }
    }
  }, [time, isGameStarted]);

  return {
    time,
    winner,
    teamOne,
    teamTwo,
    wordsList,
    modalState,
    winningCount,
    teamOneCount,
    teamTwoCount,
    isGameStarted,
    isMiddleRound,
    currentPhraseDescription,
    createList,
    handleGuess,
    handleStartGame,
    handleGameChange,
    handleModalState,
    handleRestartGame,
    handleContinueGame,
    handleCurrentDescription,
  };
};

export default useAlias;
