import React, { useState, useEffect } from 'react';
import { Container, TableBody, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core"

import { useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//constructor to display question with options as radio buttons
const Question = props => (
        <TableRow>
            <TableRow>
                Question {props.quiz.questionNum}: {props.quiz.question}
            </TableRow>
                <input type="radio" name={'q' + props.quiz.questionNum} value={props.quiz.option1} onChange={props.onClick} />{props.quiz.option1}
                <br></br>
                <input type="radio" name={'q' + props.quiz.questionNum} value={props.quiz.option2} onChange={props.onClick} />{props.quiz.option2}
                <br></br>
                <input type="radio" name={'q' + props.quiz.questionNum} value={props.quiz.option3} onChange={props.onClick} />{props.quiz.option3}
                <br></br>
                <input type="radio" name={'q' + props.quiz.questionNum} value={props.quiz.option4} onChange={props.onClick} />{props.quiz.option4}
                <br></br>
                <br></br>
        </TableRow>
)

//variable to hold answers
const initialAnswers = {
    q1:"",
    q2:"",
    q3:""
}

function QuizPage(props){
    const location = useLocation()
    const [userAnswer, setAnswer] = useState(()=>initialAnswers);
    const [question, setQuestion] = useState(()=>[]);
    const [isLoading, setLoading] = useState(()=>true);
    
    //function to set answer
    const setAnswers = e => {
        const name = e.target.name
        setAnswer ({
            ...userAnswer,
            [name]: e.target.value
          })
        console.log(userAnswer)
    }

    //function to confirm submission of quiz
    const onSubmit = e =>
    {
        e.preventDefault();
        var text = ""
        let ansArray = [userAnswer.q1,userAnswer.q2,userAnswer.q3]
        for(let i=1; i<=ansArray.length; i++){
            if(ansArray[i-1]===""){
                text = text + i + " & "
            }
        }
        text = text.substring(0,(text.length - 3))
        console.log(text)
        if (text != ""){
            confirmAlert({
                title: "Warning",
                message: "Please answer questions " + text + "!",
                buttons: [
                    {label: 'Ok'}
                ]
            })
        }else{
            confirmAlert({
                title: 'Warning',
                message: " Confirm submit?",
                buttons: [
                    {label: 'Yes', onClick: () => nextPage()},
                    {label: 'No'}
                ]
            });
        }
    }

    //function to push answers and redirect to results page
    const nextPage = e =>
    {
        let lesson = location.state.lesson
        console.log(lesson)
        props.history.push({
            pathname: '/learn/results',
            state: {quiznum: lesson, ans: userAnswer}
        })
    }

    //set questions on page load
    useEffect( () => 
    {
        async function  fetchpost()
        {
            let id = location.state.lesson
            console.log("Lesson: " + id)
            let response = await fetch('http://localhost:5000/quiz/getQuestions/' + id)
            response = await response.json()
            setQuestion(response)
            setLoading(false)
            console.log(response)
            console.log(question)
        }
        fetchpost()
    },[isLoading])
    
    //for loop mapping for questions to question constructor
    const questionList = () => {
        return question.map(currentQuestion => {
            return < Question quiz = {currentQuestion} onClick = {setAnswers}/>
        })
    }

    if(isLoading) {
        return <div><Typography variant ="h6"> Loading </Typography></div>
    }

    //display quiz questions
    return(
        <Container>
            <form onSubmit={onSubmit} name="answerlist">
                <TableContainer>
                    <TableHead>
                        <h1>Quiz on lesson {question[0].lesson}</h1>
                    </TableHead>
                    <TableBody>
                        {questionList()}
                    </TableBody>
                </TableContainer>
                <input type="submit" value="Submit"></input>
            </form>
        </Container>
    )
}

export default QuizPage