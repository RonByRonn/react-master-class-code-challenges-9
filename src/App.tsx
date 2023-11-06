import React, { useState } from "react";

function App() {
	const [value, setValue] = useState("");
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		console.log(event.currentTarget.value);
		setValue(event.currentTarget.value);
	};
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		console.log(event);
		event.preventDefault();
		setValue("");
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={value}
					placeholder="Username"
					type="text"
					onChange={onChange}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;
