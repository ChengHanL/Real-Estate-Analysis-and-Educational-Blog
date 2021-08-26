import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { Container, Grid, Typography } from "@material-ui/core"

function LessonPage(props){
    
    const [video, setVideo] = useState(()=>[]);
    const [isLoading, setLoading] = useState(()=>true);

    //function to go to selected quiz page
    const onSubmit = e =>
    {
        e.preventDefault();
        const id = e.target.name
        props.history.push({
            pathname: "/learn/quiz",
            state: {lesson: id}
        })
    }

    //function to display videos
    const displayVideos = e => {
        let content = []
        for (let i in video){
            content.push(
                <tr>
                    <td>
                        <p>
                            {video[i].lessonTitle}
                        </p>
                        <ReactPlayer
                            url={video[i].videoURL}
                            controls="true"
                        />
                        <p>Description: {video[i].description}</p>
                    </td>
                    <td>
                        <button onClick={onSubmit} name={video[i].lessonNum}>Take the quiz</button>
                    </td>
                </tr>
            )
            content.push(
                <div>
                    <br></br>
                    <br></br>
                </div>
            )
        }
        return content
    }

    //set videos on page load
    useEffect( () => 
    {
        async function  fetchpost()
        {
            let response = await fetch('http://localhost:5000/lesson/getLesson/')
            response = await response.json()
            setVideo(response)
            setLoading(false)
            console.log(response)
            console.log(video)
        }
        fetchpost()
    },[isLoading])

    if(isLoading) {
        return <div><Typography variant ="h6"> Loading </Typography></div>
    }

    //display lesson page with videos
    return(
        <Container>
            <Grid container direction="column" alignItems="center" justify="center">
                <h1> Time to learn </h1>
                <table>
                    <tbody>
                        {displayVideos()}
                    </tbody>
                </table>
            </Grid>
        </Container>
    )
}

export default LessonPage