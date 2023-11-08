import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	// 0px for vertical, 20px for horizontal
	padding: 0px 20px;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		padding: 20px;
		transition: color 0.2s ease-in;
		// coin card의 끝부분까지도 클릭할 수 있게 해줌
		display: block;
	}
	&:hover {
		// Link도 결국에는 anchor가 됨. 그치만 react-router-dom이 핸들링하기 위한 특별한 이벤트 리스너가 있음
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const coins = [
	{
		id: "btc-bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		rank: 1,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "eth-ethereum",
		name: "Ethereum",
		symbol: "ETH",
		rank: 2,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "hex-hex",
		name: "HEX",
		symbol: "HEX",
		rank: 3,
		is_new: false,
		is_active: true,
		type: "token",
	},
];

function Coins() {
	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			<CoinsList>
				{coins.map((coin) => (
					<Coin key={coin.id}>
						<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
					</Coin>
				))}
			</CoinsList>
		</Container>
	);
}

export default Coins;
