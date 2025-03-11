import React from "react";

export default function Options({ question, dispatch, answer }) {
  const isAnswer = answer !== null;
  return (
    <>
      <div className="options">
        {question.options.map((opt, index) => (
          <button
            key={opt}
            className={`btn btn-option ${index === answer ? "answer" : " "} ${
              isAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={isAnswer}
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}
