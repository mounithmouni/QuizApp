import React, { useEffect, useReducer } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Question";
import NextQuestion from "./component/NextQuestion";
import Progress from "./component/Progress";
import FinishScreen from "./component/FinishScreen";
import Footer from "./component/Footer";
import Timer from "./component/Timer";
// import DateCounter from "./DateCounter";

const intialState = {
  questions: [],
  //loading , error ,ready , active , finished;
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  const question = state.questions.at(state.index);
  const SECS_PER_QUESTION = 30;
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "refresh":
      return {
        ...intialState,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Data Unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err })); //Payload is not needed here its Optional
  }, []);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const questionsCount = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  return (
    <>
      {/* <DateCounter /> */}

      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen noOfQuestions={questionsCount} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                noOfQuestions={questionsCount}
                points={points}
                totalPoints={totalPoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                />
                <NextQuestion
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  noOfQuestions={questionsCount}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              maxPoints={totalPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
          {status === "restart" && <StartScreen dispatch={dispatch} />}
        </Main>
      </div>
    </>
  );
}
