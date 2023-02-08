// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/functions";
//
// const firebaseConfig = {};
//
// export class FireBase {
//     firestore = firebase.firestore();
//     auth = firebase.auth();
//     functions = firebase.functions();
//
//     constructor() {
//         if (window.location.hostname === "localhost") {
//             // https://firebase.google.com/docs/emulator-suite/connect_firestore
//             this.firestore.useEmulator("localhost", 8080);
//             // https://firebase.google.com/docs/emulator-suite/connect_auth
//             this.auth.useEmulator("http://localhost:9099/");
//             // https://firebase.google.com/docs/emulator-suite/connect_functions
//             this.functions.useEmulator("localhost", 5001);
//         }
//         this.auth.onAuthStateChanged((user) => session.setUser(user));
//     }
//
//     /**
//      * Function for authorizing users by email and password
//      * @param email user's email
//      * @param password user's password
//      * @return {{user: {signed: boolean}, status: boolean}|{error, status: boolean}} Object containing
//      * status of request and data or error
//      */
//     async signIn(email: string, password: string): Promise<ResponseMessage> {
//         try {
//             await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//             const result: firebase.auth.UserCredential = await this.auth.signInWithEmailAndPassword(
//                 email,
//                 password
//             );
//             if (result.user === null) {
//                 return {
//                     status: false,
//                     error: "User is not authorized",
//                 };
//             }
//             session.setUser(result.user);
//             return {
//                 status: true,
//                 user: result.user,
//             };
//         } catch (e) {
//             return {
//                 status: false,
//                 error: e.message.toString(),
//             };
//         }
//     }
//
//     /**
//      * Function to logout authorized user
//      */
//     async logout(): Promise<void> {
//         await this.auth.signOut();
//     }
// }
//
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
//
// const api = new FireBase();
//
// export default api;