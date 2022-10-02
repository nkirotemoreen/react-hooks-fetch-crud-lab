import React from "react";

function QuestionItem({ question ,onDeleteBtn,onAnswerChange}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers?.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  //handleDeleteBtn;
  const handleDeleteBtn =()=>{
    onDeleteBtn(id)
  }
  
  //handleAnswerChange
  const handleAnswerChange = (e) => {
    onAnswerChange(id, parseInt(e.target.value));
  }
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteBtn}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
