import { useContext, useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import "./inputComponent.scss"
import Checkbox from "@mui/material/Checkbox"
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	serverTimestamp,
} from "firebase/firestore"
import { db } from "../../firebase"
import ListComponent from "../ListComponent/ListComponent"
import ListMenu from "../ListMenuComponent/ListMenuComponent"
import { UserNameContext } from "../../utils/UserNameContext"

// eslint-disable-next-line react/prop-types
const InputComponent = ({ theme }) => {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState("")
	const [filter, setFilter] = useState("all")
	const [checkedState, setCheckedState] = useState({})
	const { userName } = useContext(UserNameContext)

	useEffect(() => {
		const savedTodos = localStorage.getItem(todos)
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos))
		} else {
			getFirestoreData()
		}
	}, [userName])

	const onDragEnd = result => {
		if (!result.destination) {
			return
		}

		const items = Array.from(todos)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setTodos(items)
	}

	useEffect(() => {
		if (!userName) return

		const unsubscribe = onSnapshot(collection(db, userName), snapshot => {
			const newTodos = snapshot.docs.map(doc => ({
				id: doc.id,
				item: doc.data(),
			}))
			setTodos(newTodos)

			localStorage.setItem(userName, JSON.stringify(newTodos))
		})
		return () => unsubscribe()
	}, [userName])

	const getFirestoreData = async () => {
		if (!userName) return

		const querySnapshot = await getDocs(collection(db, userName))
		const newData = querySnapshot.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}))
		setTodos(newData)
		localStorage.setItem(userName, JSON.stringify(newData))
	}

	const addTodo = async e => {
		e.preventDefault()
		if (input !== "") {
			await addDoc(collection(db, userName), {
				todo: input,
				timestamp: serverTimestamp(),
			})
			setInput("")
			await getFirestoreData()
		} else {
			setInput("")
			throw new Error("Input is empty!")
		}
	}

	const clearCompleted = async () => {
		const completedItems = todos.filter(element => checkedState[element.id])
		// Delete completed items from Firestore
		await Promise.all(
			completedItems.map(item => deleteDoc(doc(db, userName, item.id)))
		)
	}

	return (
		<div className={theme}>
			<div className="input-div">
				<form>
					<Checkbox
						disabled
						color="default"
						size="large"
						className="checkbox"
					/>
					<input
						onChange={e => setInput(e.target.value)}
						className="text-input"
						type="text"
						name="input"
						value={input}
						placeholder="Type your to-dos here..."
					/>
					<button type="submit" onClick={addTodo}>
						Add
					</button>
				</form>
			</div>
			<div
				className={
					theme === "dark-input" ? "output-div-dark" : "output-div-light"
				}
			>
				<DragDropContext onDragEnd={onDragEnd}>
					<ListComponent
						theme={theme === "dark-input" ? "dark-list" : "light-list"}
						data={todos}
						filter={filter}
						checkedState={checkedState}
						setCheckedState={setCheckedState}
					/>
				</DragDropContext>
				<div
					className={
						theme === "dark-input" ? "dark-list-menu" : "light-list-menu"
					}
				>
					<ListMenu
						theme={
							theme === "dark-input"
								? "dark-menu-container"
								: "light-menu-container"
						}
						data={todos}
						setFilter={setFilter}
						clearCompleted={clearCompleted}
					/>
				</div>
				<p className="footer-text">Drag and drop to reorder list</p>
			</div>
		</div>
	)
}

export default InputComponent
