import { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import axios from 'axios';

let userToken = sessionStorage.getItem('usertoken');

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		tickets: [],
		comments: [],
		projects: [],
	});
	const setUserInState = (incomingUserData) => {
		setUser(incomingUserData);
	};

	// useEffect(() => {
	//   let token = sessionStorage.getItem("token");
	//   console.log(token);
	//   if (token) {
	//     let userDoc = JSON.parse(atob(token.split(".")[1])).user;
	//     setUser(userDoc);
	//   }
	// }, []);

	const handleLogin = () => {
		userToken = sessionStorage.getItem('usertoken');
		axios
			.get('/api/user', {
				headers: {
					authorization: `bearer ${userToken}`,
				},
			})
			.then((res) => {
				sessionStorage.setItem('userInfo', JSON.stringify(res.data[0]));
				setIsLoggedIn({ loggedIn: true });
			})
			.catch((err) => {
				setIsLoggedIn({ loggedIn: false });
				console.log(err);
			});
	};

	return (
		<div className='App'>
			<SignUp handleLogin={handleLogin} />
			<Navbar />
		</div>
	);
}

export default App;
