import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./components/AuthProvider";
import UserProfilePage from "./pages/UserProfilePage";
import ThemeProvider from "./components/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="shop/" element={<ShopPage />} />
						<Route path="login/" element={<LoginPage />} />
						<Route path="register/" element={<RegisterPage />} />
						<Route path="profile/" element={<ProtectedRoute Component={UserProfilePage} />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
