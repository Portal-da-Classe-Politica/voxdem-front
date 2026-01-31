export interface Survey {
	id: number;
	name: string;
	description?: string;
}

export interface SurveyApiResponse {
	success: boolean;
	data: Survey[];
	count: number;
	generatedAt: string;
}
