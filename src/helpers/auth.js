import { auth, storage } from "../services/firebase";

const uploadImage = async (user, file) => {
    const imageRef = storage.ref(user.uid + '/profilePicture/' + file.name);

    await imageRef.put(file);

    const url = await imageRef.getDownloadURL().catch((error) => {
        throw error
    });

    return url
};

export const signup = async (email, password, displayName, file) => {
    await auth().createUserWithEmailAndPassword(email, password);

    const user = auth().currentUser;

    const avatar = await uploadImage(user, file);

    return user.updateProfile({
        displayName: displayName,
        photoURL: avatar
    });
};

export const signin = (email, password) => auth().signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
};

export const signInWithGitHub = () => {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
};

export const logout = () => auth().signOut();
