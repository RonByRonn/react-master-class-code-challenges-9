import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IHistorical {
	time_open: number;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
	isDark: boolean;
}

function Chart({ coinId, isDark }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(
		["ohlcv", coinId],
		() => fetchCoinHistory(coinId)
		// {
		// 	refetchInterval: 10000,
		// }
	);
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: "Price",
							data: data?.map((price) => price.close) ?? [],
						},
					]}
					options={{
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: {
							show: false,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							type: "datetime",
							labels: {
								show: false,
							},
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: false,
							},
							categories: data?.map((price) =>
								new Date(price.time_close * 1000).toUTCString()
							),
						},
						theme: { mode: isDark ? "dark" : "light" },
						stroke: {
							curve: "smooth",
							width: 4,
						},
						fill: {
							type: "gradient",
							gradient: { gradientToColors: ["blue"], stops: [0, 100] },
						},
						colors: ["red"],
						tooltip: {
							y: {
								formatter: (value) => `$ ${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
