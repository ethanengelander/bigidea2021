import './AdminPage.css';
import AdminPagePopUp from '../../components/AdminPagePopUp/AdminPagePopUp';
import React, { useEffect, useState } from 'react';
import { db } from '../../../functions/firebase/config';
import { onSnapshot, collection, query, doc, getDoc } from 'firebase/firestore';

var isAdmin = true;
let userIDAdmin;

function AdminPage() {
	const [displayName, setDisplayName] = useState('displayName');
	const [userID, setUserID] = useState('ID');
	const [isOpen, setIsOpen] = useState(false);


	function togglePopup(ev) {
		//get ID for changing settings
		// userIDAdmin = ev.target.innerHTML;
		try {


			//open popup
			setIsOpen(!isOpen);

			//this is where you were fixing the code trying to get the username to display on the popup
			// let ref = userIDAdm();

		
			const userIdSpec = ev.target.id;
			const userRef = doc(db, "users", userIdSpec)

			getDoc(userRef).then(userDB => {
				console.log(userDB.data())
				console.log(userDB.exists())
				let userNameTemp = userDB.data().displayName
				setDisplayName(userNameTemp);
				setUserID(userIdSpec);
			})
				.catch(err => {
					console.error(err)
				});
		} catch (err) {
			console.error(err)
		}

	}

	const namesRef = collection(db, 'users');
	const [Names, setNames] = useState([]);
	let q = query(namesRef);

	useEffect(() => {
        //snapshot all names and set them to 'Names'
		const namesQuery = onSnapshot(q, (snapshot) => {
			let list = [];
			snapshot.forEach((namesDB) => {
				const namesTemp = namesDB.data();
				list.push(namesTemp);
			});
			console.log(list);
			setNames(list);
		});
	}, []);

	return (
		<div>
			{isAdmin ? (
				<div className='eventMapContainer'>
					{Names.map((names) => {
						return (
							<div key={names.userID} className='nametag'>
								<div
									value='User Settings'
									className='adminButton'
									name='userSelect'>
									<h4>{names.displayName}</h4>
									<h5>{names.email}</h5>
									<button onClick={togglePopup} name='userButtonID' id={names.userID}>
										{names.userID}
									</button>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
			{isOpen && (
				<AdminPagePopUp
					tempUserIDAdm={userID}
					content={
						<>
							<b>{displayName}</b>
							<p> UserID: '{userID}'</p>
						</>
					}
					handleClose={togglePopup}
				/>
			)}
		</div>
	);
}
function userIDAdm() {
	const userIDAdm = userIDAdmin;
	return userIDAdm;
}

export { userIDAdm };
export default AdminPage;
