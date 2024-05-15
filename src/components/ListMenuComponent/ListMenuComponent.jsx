/* eslint-disable react/prop-types */
import { useState } from "react"
import "./listMenuComponents.scss"

const ListMenu = ({ theme, data, setFilter, clearCompleted }) => {
	const [activeFilter, setActiveFilter] = useState("all")

	const handleFilterChange = filter => {
		setFilter(filter)
		setActiveFilter(filter)
	}

	return (
		<div className={theme}>
			<p>{data.length} items left</p>
			<ul>
				<li>
					<button
						className={activeFilter === "all" ? "active" : ""}
						onClick={() => handleFilterChange("all")}
					>
						All
					</button>
				</li>
				<li>
					<button
						className={activeFilter === "active" ? "active" : ""}
						onClick={() => handleFilterChange("active")}
					>
						Active
					</button>
				</li>
				<li>
					<button
						className={activeFilter === "completed" ? "active" : ""}
						onClick={() => handleFilterChange("completed")}
					>
						Completed
					</button>
				</li>
			</ul>
			<button onClick={clearCompleted}>Clear Completed</button>
		</div>
	)
}

export default ListMenu
