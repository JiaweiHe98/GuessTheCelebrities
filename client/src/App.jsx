import React, { useState, useEffect } from 'react';
import './App.css';
import StartForm from './components/User/StartForm';
import UsersHistory from './components/User/UsersHistory';
import Task from './components/Tasks/Task';
import PlayerResult from './components/User/PlayerResult';
import Portal from './components/UI/Portal';
import getPlayers from './Utils/getPlayers';
import deletePlayer from './Utils/deletePlayer';
import updatePlayer from './Utils/updatePlayer';
import newPlayer from './Utils/newPlayer';

const tasks = [
  {
    id: 1,
    ans: 'Donald J. Trump',
    wrongAns1: 'Ronald Reagan',
    wrongAns2: 'Bill Clinton',
    wrongAns3: 'Barack Obama',
  },
  {
    id: 2,
    ans: 'Barack Obama',
    wrongAns1: 'Joe Biden',
    wrongAns2: 'Bill Clinton',
    wrongAns3: 'Martin Luther King Jr.',
  },
  {
    id: 3,
    ans: 'Martin Luther King Jr.',
    wrongAns1: 'Barack Obama',
    wrongAns2: 'Nelson Mandela',
    wrongAns3: 'Neil deGrasse Tyson',
  },
  {
    id: 4,
    ans: 'Neil deGrasse Tyson',
    wrongAns1: 'Martin Luther King Jr.',
    wrongAns2: 'Nelson Mandela',
    wrongAns3: 'Barack Obama',
  },
  {
    id: 5,
    ans: 'Nelson Mandela',
    wrongAns1: 'Neil deGrasse Tyson',
    wrongAns2: 'Morgan Freeman',
    wrongAns3: 'Nicolas Cage',
  },
  {
    id: 6,
    ans: 'Nicolas Cage',
    wrongAns1: 'Leonardo Wilhelm DiCaprio',
    wrongAns2: 'Tom Hanks',
    wrongAns3: 'Tom Cruise',
  },
  {
    id: 7,
    ans: 'Leonardo Wilhelm DiCaprio',
    wrongAns1: 'James Cameron',
    wrongAns2: 'Tom Hanks',
    wrongAns3: 'Johnny Depp',
  },
  {
    id: 8,
    ans: 'Lisa Su',
    wrongAns1: 'Mingzhu Dong',
    wrongAns2: 'Sundar Pichai',
    wrongAns3: 'Jensen Huang',
  },
  {
    id: 9,
    ans: 'Elon Musk',
    wrongAns1: 'Tim Cook',
    wrongAns2: 'Sundar Pichai',
    wrongAns3: 'Jensen Huang',
  },
  {
    id: 10,
    ans: 'Jensen Huang',
    wrongAns1: 'Elon Musk',
    wrongAns2: 'Sundar Pichai',
    wrongAns3: 'Mark Zuckerberg',
  },
  {
    id: 11,
    ans: 'Greta Thunberg',
    wrongAns1: 'Carrie Lam Cheng Yuet-ngor',
    wrongAns2: 'Angela Dorothea Merkel',
    wrongAns3: 'Tsai Ing-wen',
  },
  {
    id: 12,
    ans: 'Tom Cruise',
    wrongAns1: 'Jensen Huang',
    wrongAns2: 'Elon Musk',
    wrongAns3: 'Tom Hanks',
  },
  {
    id: 13,
    ans: 'Justin Bieber',
    wrongAns1: 'Leonardo Wilhelm DiCaprio',
    wrongAns2: 'Tom Hiddleston',
    wrongAns3: 'Mark Zuckerberg',
  },
  {
    id: 14,
    ans: 'Katy Perry',
    wrongAns1: 'Angela Dorothea Merkel',
    wrongAns2: 'Taylor Swift',
    wrongAns3: 'Ivanka Trump',
  },
  {
    id: 15,
    ans: 'Taylor Swift',
    wrongAns1: 'Melania Trump',
    wrongAns2: 'Katy Perry',
    wrongAns3: 'Lisa Su',
  },
];

// const defaultGameHistory = [
//   {
//     id: '61898ecad560ab001688f628',
//     name: 'name1',
//     points: 5,
//     maxpoints: 8,
//   },
//   {
//     id: '61898b97d560ab001688a4e6',
//     name: 'name2',
//     points: 5,
//     maxpoints: 9,
//   },
//   {
//     id: '61897583d560ab0016887d08',
//     name: 'name3',
//     points: 5,
//     maxpoints: 8,
//   },
// ].sort((a, b) => b.maxpoints - a.maxpoints);

const defaultCurrentPlayer = {
  id: 'N/A',
  name: 'N/A',
  points: 'N/A',
  maxpoints: 'N/A',
};

const url = '';

function App() {
  // we will shuffle all the tasks when we generate a 10 takes subset
  const [allTasks, setAllTasks] = useState(tasks);
  // 1: startPage, 2: playing, 3: show result,
  const [gameStage, setGameStage] = useState(1);
  const [username, setUsername] = useState('');
  // to point at the current player
  const [currentPlayer, setCurrentPlayer] = useState(defaultCurrentPlayer);
  const [gameHistory, setGameHistory] = useState([]);
  const [taskList, setTaskList] = useState([]);
  // error state for portal, 0: NO ERROR, 1: username error, 2: delete playing user error
  const [error, setError] = useState(0);

  // for getting player history from the local storage
  // useEffect(() => {
  //   const localGameHistory = localStorage.getItem('history');
  //   if (localGameHistory) {
  //     setGameHistory(JSON.parse(localGameHistory));
  //   }
  // }, [gameStage]);

  // when update history is needed
  const updateHistory = async (url2) => {
    const players = await getPlayers(url2);
    // console.log(players);
    setGameHistory(players.sort((a, b) => b.maxpoints - a.maxpoints || b.points - a.points));
  };

  // when load up the game
  useEffect(async () => {
    updateHistory(url);
  }, []);

  // pick 10 tasks from all takes
  const tasksGenerator = (taskListGame) => {
    const bucket = [];

    for (let i = 0; i < 10; i += 1) {
      const randomIndex = Math.floor(Math.random() * taskListGame.length);
      bucket.push(taskListGame[randomIndex]);
      taskListGame.splice(randomIndex, 1);
    }
    setAllTasks([...taskListGame, ...bucket]);
    setTaskList(bucket);
  };

  // delete the history for a certain player
  const deleteGameHistory = (player) => {
    if (player.name === currentPlayer.name && gameStage === 2) {
      setError(2);
    } else {
      setGameHistory(() => gameHistory.filter((eachPlayer) => eachPlayer.id !== player.id));
      deletePlayer(url, player.id);
    }
  };

  const createNewPlayer = async (newUsername) => {
    const newPlayerSetup = {
      name: newUsername,
      points: 0,
      maxpoints: 0,
    };
    const result = await newPlayer(url, newPlayerSetup);
    setCurrentPlayer(result);
    setGameHistory((prevHis) => {
      let newHis = prevHis.filter((player) => player.name !== newUsername);
      newHis = [...newHis, result].sort((a, b) => b.maxpoints - a.maxpoints || b.points - a.points);
      return newHis;
    });
  };

  // when submit username
  const initializeCurrentPlayer = (currentUsername) => {
    const currentPlayerIndex = gameHistory.findIndex((player) => player.name === currentUsername);
    if (currentPlayerIndex !== -1) {
      const currentPlayerSetup = {
        id: gameHistory[currentPlayerIndex].id,
        name: gameHistory[currentPlayerIndex].name,
        points: 0,
        maxpoints: gameHistory[currentPlayerIndex].maxpoints,
      };
      setCurrentPlayer(currentPlayerSetup);
      updatePlayer(url, currentPlayerSetup);
      setGameHistory((prevHis) => {
        let newHis = prevHis.filter((player) => player.name !== currentUsername);
        newHis = [
          ...newHis,
          currentPlayerSetup].sort((a, b) => b.maxpoints - a.maxpoints || b.points - a.points);
        return newHis;
      });
    } else {
      createNewPlayer(currentUsername);
    }
  };

  // just for user input name
  // when the user input a correct name, initialize the user immediately
  const onSubmitUsernameHandler = (userInputUsername) => {
    const pattern = /^[0-9a-z]+$/i;
    if (userInputUsername.match(pattern)) {
      setUsername(userInputUsername);
      initializeCurrentPlayer(userInputUsername);
      setGameStage(2);
      tasksGenerator(allTasks);
    } else {
      setError(1);
    }
  };

  // update the score of the current player
  const onUpdateScoreHandler = (newScore) => {
    const current = {
      id: currentPlayer.id,
      name: currentPlayer.name,
      points: newScore,
      maxpoints: Math.max(currentPlayer.maxpoints, newScore),
    };
    updatePlayer(url, current);
    setCurrentPlayer(current);
    setGameHistory((prevHis) => {
      let newHis = prevHis.filter((player) => player.name !== currentPlayer.name);
      newHis = [
        ...newHis,
        current].sort((a, b) => b.maxpoints - a.maxpoints || b.points - a.points);
      return newHis;
    });
  };

  // when the last quiz is finished
  const quizOverHandler = () => {
    updateHistory(url);
    setGameStage(3);
  };

  // when the user hit play again
  const playAgainHandler = () => {
    setGameStage(1);
  };

  // when the user hit OK or try again
  const onDismissError = () => {
    setError(0);
  };

  // to dis play the user history all the time
  return (
    <>
      {error === 1 && (
        <Portal
          onClickButton={onDismissError}
          title="Error!"
          message="Your username need to be alphanumeric!"
          buttonContent="Try Again"
        />
      )}
      {error === 2 && (
        <Portal
          onClickButton={onDismissError}
          title="Error!"
          message="You cannot delete the user you are playing!"
          buttonContent="OK"
        />
      )}
      {gameStage === 1 && (
        <StartForm onSubmitUsername={onSubmitUsernameHandler} />
      )}
      {gameStage === 2 && (
        <Task
          currentUsername={username}
          currentBestScore={+currentPlayer.maxpoints}
          taskList={taskList}
          onUpdateScore={onUpdateScoreHandler}
          onQuit={quizOverHandler}
        />
      )}
      {gameStage === 3 && (
        <PlayerResult player={currentPlayer} playAgain={playAgainHandler} />
      )}

      <UsersHistory
        gameHistory={gameHistory}
        onDeleteHistory={deleteGameHistory}
      />

    </>
  );
}

export default App;
