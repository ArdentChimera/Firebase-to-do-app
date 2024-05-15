import { createContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setUserName } from "./store"

export const UserNameContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserNameProvider = ({ children }) => {
	const userName = useSelector(state => state.userName)
	const dispatch = useDispatch()

	const updateUserName = newUserName => {
		dispatch(setUserName(newUserName))
		localStorage.setItem("userName", newUserName)
	}

	return (
		<UserNameContext.Provider value={{ userName, updateUserName }}>
			{children}
		</UserNameContext.Provider>
	)
}
