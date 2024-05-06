import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
	const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
	console.log("loading: ", loading)
	console.log("data: ", data)
	console.log("error: ", error)

	if (loading) return null;

	const isAuthenticated = data && data.authUser;

	return (
		<>
			{isAuthenticated && <Header />}
			<Routes>
				<Route path='/' element={isAuthenticated ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={isAuthenticated ? <TransactionPage /> : <Navigate to='/login' />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
