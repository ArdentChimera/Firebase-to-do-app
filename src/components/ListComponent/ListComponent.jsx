/* eslint-disable react/prop-types */
import Checkbox from "@mui/material/Checkbox"
import "./listComponent.scss"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { useContext } from "react"
import { UserNameContext } from "../../utils/UserNameContext"
import { v4 as uuidv4 } from "uuid"

// eslint-disable-next-line react/prop-types
const ListComponent = ({
	theme,
	data,
	filter,
	checkedState,
	setCheckedState,
}) => {
	const { userName } = useContext(UserNameContext)
	const droppableId = `droppable-${uuidv4()}`

	const handleCheckboxChange = id => {
		setCheckedState(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const filteredData = data.filter(({ id }) => {
		if (filter === "all") return true
		if (filter === "active") return !checkedState[id]
		if (filter === "completed") return checkedState[id]
		return true
	})

	return (
		<div className={theme}>
			<h2>Your To-Do list</h2>
			<Droppable droppableId={droppableId}>
				{provided => (
					<ul {...provided.droppableProps} ref={provided.innerRef}>
						{filteredData.map((element, index) => (
							<Draggable
								key={element.id}
								draggableId={element.id}
								index={index}
							>
								{provided => (
									<li
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={
											theme === "dark-list" ? "output-dark" : "output-light"
										}
									>
										<Checkbox
											checked={!!checkedState[element.id]}
											onChange={() => handleCheckboxChange(element.id)}
											color="default"
											size="large"
											className="checkbox"
										/>
										<span
											className={
												checkedState[element.id]
													? "todo-text strikethrough"
													: "todo-text"
											}
										>
											{element.item && element.item.todo
												? element.item.todo
												: "No todo text"}
										</span>
										<IconButton
											onClick={() => {
												deleteDoc(doc(db, userName, element.id))
											}}
											className="delete-button"
											aria-label="delete"
										>
											<DeleteIcon />
										</IconButton>
									</li>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</div>
	)
}

export default ListComponent
