import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (newCategory: IToDo["category"]) => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: newCategory };
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};
	const onClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;

		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			// 이 아래 as any로 해줘야 타입스크립트 통과하기 때문에 onClick2보다는 onClick과 같이 작성하는 것이 좋음.
			const newToDo = { text, id, category: name as any };
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};

	return (
		<li>
			<span>{text}</span>
			{category !== Categories.DOING && (
				// <button onClick={() => onClick(Categories.DOING)}>Doing</button>
				<button name={Categories.DOING} onClick={onClick2}>
					Doing
				</button>
			)}
			{category !== Categories.TO_DO && (
				// <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
				<button name={Categories.TO_DO} onClick={onClick2}>
					To Do
				</button>
			)}
			{category !== Categories.DONE && (
				// <button onClick={() => onClick(Categories.DONE)}>Done</button>
				<button name={Categories.DONE} onClick={onClick2}>
					Done
				</button>
			)}
		</li>
	);
}

export default ToDo;
