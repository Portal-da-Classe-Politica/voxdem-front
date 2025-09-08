export interface ProfileAttribute {
	key: string;
	name: string;
	answerGroupId: number;
	description: string;
}

export interface ProfileAttributesApiResponse {
	success: boolean;
	data: ProfileAttribute[];
	count: number;
}