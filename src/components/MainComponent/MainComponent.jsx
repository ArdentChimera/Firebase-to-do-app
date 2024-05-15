import { useState } from "react"
import MoonIcon from "../../assets/images/icon-moon.svg"
import SunIcon from "../../assets/images/icon-sun.svg"
import "./mainComponent.scss"
import InputComponent from "../InputComponent/InputComponent"

const MainComponent = () => {
	const [isDark, setIsDark] = useState(true)

	const handleThemeChange = () => {
		if (isDark) {
			setIsDark(false)
		} else {
			setIsDark(true)
		}
	}

	return (
		<>
			{isDark ? (
				<div className="main-container-dark">
					<div className="header-container-dark">
						<div className="header">
							<h1>TODO</h1>
							<button onClick={handleThemeChange}>
								<span>
									<img
										className="theme-icon"
										src={MoonIcon}
										alt="theme-icon-button"
									/>
								</span>
							</button>
						</div>
						<InputComponent theme="dark-input" />
					</div>
				</div>
			) : (
				<div className="main-container-light">
					<div className="header-container-light">
						<div className="header">
							<h1>TODO</h1>
							<button onClick={handleThemeChange}>
								<span>
									<img
										className="theme-icon"
										src={SunIcon}
										alt="theme-icon-button"
									/>
								</span>
							</button>
						</div>
						<InputComponent theme="light-input" />
					</div>
				</div>
			)}
		</>
	)
}

export default MainComponent
