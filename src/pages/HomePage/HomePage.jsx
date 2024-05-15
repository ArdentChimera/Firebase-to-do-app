import { useContext, useState } from "react"
import "./homePage.scss"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { UserNameContext } from "../../utils/UserNameContext"

const HomePage = () => {
	const [input, setInput] = useState("")
	const navigate = useNavigate()
	const { setUserName } = useContext(UserNameContext)

	const createFirestoreCollection = async name => {
		if (name !== "") {
			try {
				await addDoc(collection(db, name), {
					todo: "Your first to-do...",
					timestamp: serverTimestamp(),
				})
				setUserName(name)
				navigate("/to-do-list")
			} catch (error) {
				console.error("Error adding document: ", error)
			}
		} else {
			console.error("Username is not provided...")
		}
	}

	return (
		<div className="main-container">
			<div className="input-container">
				<h1>Generate your To-do list</h1>
				<input
					type="text"
					placeholder="Type your name here..."
					onChange={e => {
						setInput(e.target.value)
					}}
				/>
				<button onClick={() => createFirestoreCollection(input)}>
					Generate new list
				</button>
			</div>
		</div>
	)
}

export default HomePage
