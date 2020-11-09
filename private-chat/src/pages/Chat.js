import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { readChats, writeChats } from "../helpers/db";

export const Chat = () => {

    const [user] = useState(auth().currentUser);
    const [chats, setChats] = useState([]);
    const [content, setContent] = useState('');
    const [readError, setReadError] = useState(null);
    const [writeError, setWriteError] = useState(null);
    const [loadingChats, setLoadingChats] = useState(false);

    const myRef = React.createRef();

    useEffect(() => {
        setReadError(null);
        setLoadingChats(null);

        const chatArea = myRef.current;

        try {
            (async () => {
                const readedChats = await readChats();
                setChats(readedChats);
            })();

            chatArea.scrollBy(0, chatArea.scrollHeight);
            setLoadingChats(false);

        } catch (error) {
            setReadError(error.message);
            setLoadingChats(false)
        }
    }, [chats]);

    const handleChange = event => {
        setContent(event.target.value);
    };


    const handleSubmit = async event => {
        event.preventDefault();

        setWriteError(null);

        const chatArea = myRef.current;

        try {
            const message = { content, timestamp: Date.now(), uid: user.uid };
            await writeChats(message);

            setContent('');
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            setWriteError(error.message);
        }
    };

    const formatTime = timestamp => {
        const d = new Date(timestamp);
        return `${ d.getDate() }/${ (d.getMonth() + 1) }/${ d.getFullYear() } ${ d.getHours() }:${ d.getMinutes() }`;
    };

    return (
        <div>
            <Header/>

            <div className="chat-area" ref={ myRef }>
                {/* loading indicator */ }
                { loadingChats ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : "" }
                {/* chat area */ }
                { chats.map((chat, index) => {
                    return <p key={ index }
                              className={ "chat-bubble " + (user.uid === chat.uid ? "current-user" : "") }>
                        { chat.content }
                        <br/>
                        <span className="chat-time float-right">{ formatTime(chat.timestamp) }</span>
                    </p>
                }) }
            </div>
            <form onSubmit={ handleSubmit } className="mx-3">
                    <textarea className="form-control" name="content" onChange={ handleChange }
                              value={ content }/>
                { readError ? <p className="text-danger">{ readError }</p> : null }
                <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
            </form>
            <div className="py-5 mx-3">
                Login in as: <strong className="text-info">{ user.email }</strong>
            </div>
        </div>
    );
};
