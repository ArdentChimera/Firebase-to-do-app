import { createContext, useEffect, useState } from "react"

export const UserNameContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserNameProvider = ({ children }) => {
	const [userName, setUserName] = useState(() => {
		// Load from local storage
		const savedUserName = localStorage.getItem("userName")
		return savedUserName || ""
	})

	useEffect(() => {
		// Save to local storage
		if (userName) {
			localStorage.setItem("userName", userName)
		}
	}, [userName])

	return (
		<UserNameContext.Provider value={{ userName, setUserName }}>
			{children}
		</UserNameContext.Provider>
	)
}
