import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { auth, db } from "../../services/firebase";

import './styles.scss';
import { Loader } from "../../components/Loader/Footer";

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
    }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort(function (a, b) {
                    return a.timestamp - b.timestamp
                })
                this.setState({ chats });
                chatArea.scrollBy(0, chatArea.scrollHeight);
                this.setState({ loadingChats: false });
            });
        } catch (error) {
            this.setState({ readError: error.message, loadingChats: false });
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({ content: '' });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);

        return `${ d.getDate() }/${ (d.getMonth() + 1) }/${ d.getFullYear() } ${ d.getHours() }:${ d.getMinutes() }`;
    }

    render() {
        return (
            <>
                <Header/>
                <div className='cmp-chat' ref={ this.myRef }>
                    {/* loading indicator */ }
                    { this.state.loadingChats ?
                        <Loader/> : "" }
                    {/* chat area */ }
                    { this.state.chats.map((chat, index) => {
                        return <div key={ index }
                                    className={ 'cmp-chat--item ' + (this.state.user.uid === chat.uid ? "current-user" : "") }>
                            <div className='cmp-chat--item__content'>
                                <span className='cmp-chat--item__content--paragraph'>{ chat.content }</span>
                                <span className='cmp-chat--time'>{ this.formatTime(chat.timestamp) }</span>
                            </div>
                        </div>
                    }) }
                </div>
                <form onSubmit={ this.handleSubmit } className='cmp-chat--form'>
                    <input name='content' type='text' placeholder='Your Text' onChange={ this.handleChange }
                           value={ this.state.content }/>
                    { this.state.readError ? <p>{ this.state.readError }</p> : null }
                    <button type='submit'>Send</button>
                </form>
            </>
        );
    }
}
