import React,{useEffect ,useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  //set state
  const [questions, setQuestions] = useState([])
  let url ="http://localhost:4000/questions"
  //useEffect to fetch questions from the API
  useEffect(() =>{
    fetch(url)
    .then(res => res.json())
    .then((questions) =>{
      setQuestions(questions)
      
    })
    .catch((error) => console.log(error))
  }, []);
  //console.log(questions)
  
  //delete the question from the list
  const handleDeleteBtn = (id) =>{
    fetch(`http://localhost:4000/questions/${id}`,
    {
      method: 'DELETE',
      headers:{"Content-Type": "application/json"}

    })
    .then((res) => res.json())
    .then(()=>{
      const updatedQns = questions.filter((qns)=> qns.id !== id);
      console.log(updatedQns)
      setQuestions(updatedQns);
    }) 
  }
  //change answers
  const handleAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((qns) => {
          if (qns.id === updatedQuestion.id) return updatedQuestion;
          return qns;
        });
        setQuestions(updatedQuestions);
      })
  }
  

  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
       {questions?.map((qns) =>(
        <QuestionItem key={qns.id}
         question={qns}
         onDeleteBtn={handleDeleteBtn}
         onAnswerChange={handleAnswerChange}
         />
       ))}
       
       
    
      </ul>
    </section>
  );
}

export default QuestionList;
