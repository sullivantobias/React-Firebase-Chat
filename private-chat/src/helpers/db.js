import { db } from "../services/firebase";

export const readChats = async () => {
    let chats = [];

    db.ref("chats").on("value", snapshot => {
        snapshot.forEach(snap => {
            chats.push(snap.val())
        });

        chats.sort((a, b) => {
            return a.timestamp - b.timestamp
        });
    });

    return chats;
};

export const writeChats = message => db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid
});

