import { configureStore, createSlice } from "@reduxjs/toolkit"

// Define slice for managing username state
const userNameSlice = createSlice({
	name: "userName",
	initialState: "",
	reducers: {
		setUserName: (state, action) => {
			return action.payload
		},
	},
})

// Export action creator
export const { setUserName } = userNameSlice.actions

// Get userName from localStorage
const savedUserName = localStorage.getItem("userName")

// Configure store
const store = configureStore({
	reducer: {
		userName: userNameSlice.reducer,
		// Add other reducers here if needed
	},
	preloadedState: {
		userName: savedUserName || "", // Use savedUserName or empty string if not present
	},
})

export default store
