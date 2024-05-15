import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import HomePage from "./pages/HomePage/HomePage.jsx"
import MainComponent from "./components/MainComponent/MainComponent.jsx"
import store from "./utils/store.js"
import { Provider } from "react-redux"
import { UserNameProvider } from "./utils/UserNameContext.jsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/to-do-list",
		element: <MainComponent />,
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<UserNameProvider>
				<RouterProvider router={router} />
			</UserNameProvider>
		</Provider>
	</React.StrictMode>
)
