import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (newCategory: IToDo["category"]) => {};
	const onClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;

		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const oldToDo = oldToDos[targetIndex];
			const newToDo = { text, id, category: name };
		});
	};
	return (
		<li>
			<span>{text}</span>
			{category !== "DOING" && (
				// <button onClick={() => onClick("DOING")}>Doing</button>
				<button name="DOING" onClick={onClick2}>
					Doing
				</button>
			)}
			{category !== "TO_DO" && (
				// <button onClick={() => onClick("TO_DO")}>To Do</button>
				<button name="TO_DO" onClick={onClick2}>
					To Do
				</button>
			)}
			{category !== "DONE" && (
				// <button onClick={() => onClick("DONE")}>Done</button>
				<button name="DONE" onClick={onClick2}>
					Done
				</button>
			)}
		</li>
	);
}

export default ToDo;
