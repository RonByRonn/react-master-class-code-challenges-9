import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
	min-height: 200px;
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = (info: DropResult) => {
		const { source, destination, draggableId } = info;
		if (!destination) return;
		if (destination?.droppableId === source.droppableId) {
			// same board movement.
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];
				// 1) Delete item on source.index
				boardCopy.splice(source.index, 1);
				// 2) Put back the item on the destination.index
				boardCopy.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					// 아래는 키로 변수를 입력하기 위해 대괄호를 쓴 것.
					[source.droppableId]: boardCopy,
				};
			});
		} else {
			setToDos((allBoards) => {
				const sourceBoardCopy = [...allBoards[source.droppableId]];
				const taskObj = sourceBoardCopy[source.index];
				const targetBoardCopy = [...allBoards[destination.droppableId]];
				// 1) Delete item on source.index
				sourceBoardCopy.splice(source.index, 1);
				// 2) Put back the item on the destination.index
				targetBoardCopy.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					// 아래는 키로 변수를 입력하기 위해 대괄호를 쓴 것.
					[source.droppableId]: sourceBoardCopy,
					[destination.droppableId]: targetBoardCopy,
				};
			});
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
