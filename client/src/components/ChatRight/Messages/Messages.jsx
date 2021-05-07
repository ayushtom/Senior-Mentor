import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message"; 
import { makeStyles } from '@material-ui/core/styles';

/*
message = [{
    from : {
        _id : 
        first_name : 
        last_name :
        body :  
    }
}]
*/

const messages = [
    {   _id : "34545434sdfd",
        userId : {
            _id : "abc",
            firstName : "Ramesh",
            lastName : "Suresh"
        },
        body : "Hello There !! How are you"
    },
    {   _id : "34545434",
        userId : {
            _id : "def",
            firstName : "Elon",
            lastName : "Musk"
        },
        body : "I am fine bro, just launched SN15"
    },
    {   _id : "123213",
        userId : {
            _id : "abc",
            firstName : "Ramesh",
            lastName : "Suresh"
        },
        body : "Damn bruh it didn't explode"
    },
    {   _id : "34545434sdfd",
        userId : {
            _id : "abc",
            firstName : "Ramesh",
            lastName : "Suresh"
        },
        body : "Hello There !! How are you"
    },
    {   _id : "34545434",
        userId : {
            _id : "def",
            firstName : "Elon",
            lastName : "Musk"
        },
        body : "I am fine bro, just launched SN15"
    },
    {   _id : "123213",
        userId : {
            _id : "abc",
            firstName : "Ramesh",
            lastName : "Suresh"
        },
        body : "Damn bruh it didn't explode"
    },
    {   _id : "34545434sdfd",
        userId : {
            _id : "abc",
            firstName : "Ramesh",
            lastName : "Suresh"
        },
        body : "Hello There !! How are you"
    },
    {   _id : "34545434",
        userId : {
            _id : "def",
            firstName : "Elon",
            lastName : "Musk"
        },
        body : "I am fine bro, just launched SN15"
    },
    {   _id : "123213",
        userId : {
            _id : "abc",
            firstName : "Ramesh",
            lastName : "Suresh"
        },
        body : "Damn bruh it didn't explode"
    }
]; 


const useStyles = makeStyles((theme) => ({
    stb : {
        height : "60%",
        overfloe : "auto"
    }, 
}));

const styles = {
    height: "60vh !important",
}

const Messages = () => {
    const classes = useStyles();
    return (
        <ScrollToBottom style={{height:"60vh"}}>
            {
                messages.map((x,i)=>{
                    return (
                        <Message key={i} message={x}/>
                    )
                })
            }
        </ScrollToBottom>
    )
}

export default Messages; 