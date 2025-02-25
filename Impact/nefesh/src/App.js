import './stylesheets/page/App.css';
import './stylesheets/scrollbar.css';
import Menu from "./views/components/menu";
import './views/templates/AdminPagePopUp';
import { Routes, Route } from 'react-router-dom';

import Login from './views/pages/Login.js';
import Error from './views/pages/404.js';
import Unauthorised from './views/pages/401.js';
import ProfilePage from './views/pages/ProfilePage';
import ContactUs from './views/templates/ContactUs';
import ArticleCreation from './views/templates/ArticleCreation';
import MainPage from './views/pages/MainPage';
import { checkRole } from './scripts/general.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './scripts/firebase/config';

import AdminPage from './views/pages/AdminPage';
import StickyBanner from './views/templates/StickyBanner';
import Event from './views/pages/Event';


let role = null;

const auth = getAuth();
let userID = '';
let loggedIn;
function App() {
	const [userState, setUserState] = useState({});
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('user logged in');
				const uid = user.uid;
				userID = uid;
				//get user from db
				getDoc(doc(db, 'users', uid)).then((userDB) => {
					if (userDB.exists()) {
						console.log('user exists');
						role = userDB.data().role;
						setUserState({
							userName: userDB.data().displayName,
							userOrg: userDB.data().organization,
						});
						
						//console.log(role)
						const uid = userDB.data().userID;
						userID = uid;
					} else {
						//if user exist in db get the user from DB and get the role
						console.log('user does not exist');
						setDoc(doc(db, 'users', uid), {
							age: 'null',
							displayName: user.displayName,
							email: user.email,
							location: 'null',
							organization: 'null',
							role: 'ole',
							sex: 'null',
							userID: uid,
							userIcon: user.photoURL,
							userPref: ['null'],
						});
					}
				});
				loggedIn = true;
			} else {
				// user logged out
				console.log('User logged out');
				loggedIn = false;
			}
		});
	}, []);

	return (
		<div>
		<div className='container_AppMain'>
			
			{
			loggedIn ? (
				<div className='container_App'>
					<Routes>
					<Route path='/' element={<MainPage role={role} />} />
						<Route path='404' element={<Error />} />
						<Route path='401' element={<Unauthorised />} />
						<Route path='MainPage' element={<MainPage role={role} />} />
						<Route path='ContactUs' element={<ContactUs />} />
						<Route path='event/:eventID' element={<Event />} />
						<Route path='ArticleCreation' element={<ArticleCreation userID={userID} userOrg={userState.userOrg} />} />
						<Route path='ProfilePage' element={<ProfilePage uid={userID} />} />
						<Route path='AdminPage' element={<AdminPage />} />
					</Routes>

				</div>
			) : (
				<div className='container_App'>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='login' element={<Login />} />
					</Routes>
				</div>
				
			)}
			
		</div>
		{
			loggedIn ? (<StickyBanner role={role} />) : (null) 
		}
		</div>
	);
}

export default App;