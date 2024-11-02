import React, { useRef, useState } from "react";
import "./Quiz.css";
import data from "../../Assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(data[index]);
  let [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionArray = [option1, option2, option3, option4];

  const checkAnswer = (e, correctAnswer) => {
    if (lock === false) {
      if (questions.correctAnswer === correctAnswer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[questions.correctAnswer - 1].current.classList.add(
          "correct"
        );
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestions(data[index]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h2>Quiz App</h2>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h3>
            {index + 1}. {questions.question}
          </h3>
          <ul role="list">
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {questions.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {questions.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {questions.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {questions.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h3>
            You scored {score} out of {data.length}
          </h3>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
