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
	labelsDetailed: LabelsDetailed[];
}

export interface ChartDataset {
	data: number[];
	backgroundColor: string;
	borderColor: string;
	borderWidth: number;
	label: string;
}

export interface LabelsDetailed {
	code: string;
	label: string;
}

export interface ChartApiErrorResponse {
	success: false;
	error: string;
	message: string;
}

export type ChartApiResponse = ChartApiSuccessResponse | ChartApiErrorResponse;
