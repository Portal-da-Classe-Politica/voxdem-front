export interface ChartApiSuccessResponse {
	success: true;
	data: {
		question: ChartQuestion;
		chartData: ChartData;
		totalResponses: number;
	};
	generatedAt: string;
}

export interface ChartQuestion {
	code: string;
	text: string;
}

export interface ChartData {
	labels: string[];
	datasets: ChartDataset[];
}

export interface ChartDataset {
	data: number[];
	backgroundColor: string[];
	borderColor: string[];
	borderWidth: number;
}

export interface ChartApiErrorResponse {
	success: false;
	error: string;
	message: string;
}

export type ChartApiResponse = ChartApiSuccessResponse | ChartApiErrorResponse;
