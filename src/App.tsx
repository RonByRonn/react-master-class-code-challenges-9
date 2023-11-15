import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelector, minutesState } from "./atoms";

function App() {
	const [minutes, setMinutes] = useRecoilState(minutesState);
	const hours = useRecoilValue(hoursSelector);
	const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
		// Convert string to number: +
		setMinutes(event.currentTarget.value);
	};
	return (
		<div>
			<input
				value={minutes}
				onChange={onMinutesChange}
				type="number"
				placeholder="Minutes"
			/>
			<input value={hours} type="number" placeholder="Hours" />
		</div>
	);
}

export default App;
