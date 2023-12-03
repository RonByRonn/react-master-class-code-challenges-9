import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetImagesResult, getMovieImages, getTvImages } from "../api";
import { makeImagePath } from "../utils";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	/* top: 550px; */
`;

const Poster = styled.div<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	width: 150px;
	height: 150px;
`;

interface ImagesProps {
	kind: string;
	id: number;
}
function Images({ kind, id }: ImagesProps) {
	const { data, isLoading } = useQuery<IGetImagesResult>(["images"], () =>
		kind === "movie" ? getMovieImages(id + "") : getTvImages(id + "")
	);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{" "}
			<Grid>
				{isLoading
					? null
					: data?.backdrops.map((i) => (
							<Poster bgPhoto={makeImagePath(i.file_path, "w500")} />
					  ))}
			</Grid>
		</div>
	);
}

export default Images;
