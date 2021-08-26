import React, { useState, useEffect, createRef } from 'react';
import { Container, Typography} from "@material-ui/core";
import {useLocation} from "react-router-dom"
import axios from 'axios';
import { useScreenshot, createFileName } from 'use-react-screenshot'

function ResultPage(props){

    const ref = createRef(null);
    const location = useLocation()
    const [userAnswer, setAnswer] = useState(()=>[]);
    const [question, setQuestion] = useState(()=>[]);
    const [resultID, setResultID] = useState()
    const [isLoading, setLoading] = useState(()=>true);
    const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
    });

    const userResult = {
        uID: localStorage.getItem('USERID'),
        score: 0,
        maxScore: 0,
        lesson: location.state.quiznum,
        questionlist: new Array()
    }

    //download image file settings
    const download = (image, { name = "Quiz on Lesson "+location.state.quiznum, extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    //download file function
    const getImage = () => takeScreenShot(ref.current).then(download);

    //function to redirect back to the quiz page
    const retake = e =>
    {
        e.preventDefault();
        let id = location.state.quiznum
        props.history.push({
            pathname: '/learn/quiz',
            state: {lesson:id}
        })
    }

    //function to go back to lesson page
    const backtolesson = e =>
    {
        e.preventDefault();
        props.history.push('/learn/lessons')
    }

    //function for sharing results on forum
    const shareResults = e =>
    {
        e.preventDefault();
        if(localStorage.getItem("SESSIONTOKEN") === null) {
            props.history.push('/login')
        }else{
            props.history.push({
                pathname: '/forum/create',
                state: {
                    postType : "Edu",
                    results_id : resultID,
                }
            })
        }
    }

    //function to display results in quiz format    
    const displayResults = e => {
        let content = []
        for(let i in question){
            content.push(
                <div>
                    <table>
                        <tr>
                            Q{question[i].questionNum}: {question[i].question}
                        </tr>
                        {
                            question[i].option1 === question[i].answer ?
                            <tr><label style={{background: '#00FF00'}}>1: {question[i].option1}</label></tr> :
                            userAnswer[i] === question[i].option1 ?
                            <tr><label style={{background: '#FF0000'}}>1: {question[i].option1}</label></tr> :
                            <tr>1: {question[i].option1}</tr>                                
                        }
                        {
                            question[i].option2 === question[i].answer ?
                            <tr><label style={{background: '#00FF00'}}>2: {question[i].option2}</label></tr>:
                            userAnswer[i] === question[i].option2 ?
                            <tr><label style={{background: '#FF0000'}}>2: {question[i].option2}</label></tr> :
                            <tr>2: {question[i].option2}</tr>
                        }
                        {
                            question[i].option3 === question[i].answer ?
                            <tr><label style={{background: '#00FF00'}}>3: {question[i].option3}</label></tr> :
                            userAnswer[i] === question[i].option3 ?
                            <tr><label style={{background: '#FF0000'}}>3: {question[i].option3}</label></tr> :
                            <tr>3: {question[i].option3}</tr>  
                        }
                        {
                            question[i].option4 === question[i].answer ?
                            <tr><label style={{background: '#00FF00'}}>4: {question[i].option4}</label></tr> :
                            userAnswer[i] === question[i].option4 ?
                            <tr><label style={{background: '#FF0000'}}>4: {question[i].option4}</label></tr> :
                            <tr>4: {question[i].option4}</tr>  
                        }
                        <br></br>
                        {
                            userAnswer[i] === question[i].answer ?
                            <tr>Your answer: Correct</tr> :
                            <tr>Your answer: Incorrect</tr>
                        }
                    </table>
                    <br></br>
                </div>
            )
        }
        return content
    }

    //function to perform grading
    const grader = e => {
        let score = 0
        let maxScore = 0
        let marked = ""
        console.log("Before")
        console.log(userResult)
        for(let i in question){
            if(question[i].answer === userAnswer[i]){
                score = score + 1;
                marked = "Correct"
            }else{
                marked = "Wrong"
            }
            userResult.questionlist.push([
                    question[i].question,
                    question[i].option1,
                    question[i].option2,
                    question[i].option3,
                    question[i].option4,
                    question[i].answer,
                    userAnswer[i],
                    marked
            ])
            maxScore++
        }
        userResult.score = score
        userResult.maxScore = maxScore
        console.log("After")
        console.log(userResult)
        return <h3>Your score is: {score}/{maxScore}</h3>
    }

    //function to get questions on page load
    useEffect( () => 
    {
        async function  fetchpost()
        {
            let id = location.state.quiznum
            let ans = location.state.ans
            let answer = [ans.q1,ans.q2,ans.q3]
            setAnswer(answer)
            console.log(userAnswer)
            console.log("----")
            let response = await fetch('http://localhost:5000/quiz/getQuestions/'+id)
            response = await response.json()
            console.log(response)
            setQuestion(response)
            console.log(question)
            setLoading(false)
            
            if(!(localStorage.getItem("SESSIONTOKEN") === null)) {
                if(!(userResult.maxScore == 0))
                {

                
                axios.post('http://localhost:5000/result/addResults/', userResult)
                .then(response => {
                    setResultID(response.data.results_id)
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
            }
        }
        fetchpost()
    },[isLoading])

    if(isLoading) {
        return <div><Typography variant ="h6"> Loading </Typography></div>
    }

    //display results page
    return(
        <Container>
            <div>
                <button onClick={getImage}>Download Results</button>
                <button onClick={shareResults}>Share your results</button>
                <button onClick={retake}>Retake the quiz</button>
                <button onClick={backtolesson}>Back to lessons</button>
            </div>
            <div ref={ref}>
                <h2>Lesson {location.state.quiznum} Quiz</h2>
                {displayResults()}
                {grader()}
            </div>
        </Container>       
    )
}

export default ResultPage