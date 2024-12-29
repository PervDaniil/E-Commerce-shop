import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import BasketPage from "./pages/BasketPage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./components/AuthProvider";
import UserProfilePage from "./pages/UserProfilePage";
import ThemeProvider from "./components/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPreviewPage from "./pages/ProductPreviewPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="shop/" element={<ShopPage />} />
						<Route path="about/" element={<AboutPage />} />
						<Route path="login/" element={<LoginPage />} />
						<Route path="register/" element={<RegisterPage />} />
						<Route path="basket/" element={<ProtectedRoute Component={BasketPage} />} />
						<Route path="profile/" element={<ProtectedRoute Component={UserProfilePage} />} />
						<Route path="product-preview/" element={<ProtectedRoute Component={ProductPreviewPage}/>}/>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
