export interface Question {
	id: number;
	code: string;
	text: string;
	totalResponses: number;
}

export interface QuestionApiResponse {
	success: boolean;
	data: Question[];
	count: number;
	generatedAt: string;
}