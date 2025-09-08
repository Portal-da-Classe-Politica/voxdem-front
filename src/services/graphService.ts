import { voxdemApi } from '../lib/api';
import { QuestionApiResponse } from '../types/question';
import { ProfileAttributesApiResponse } from '../types/porfileAttributes';
import { ChartApiResponse } from '../types/chart';

export const graphService = {
     async getQuestions(): Promise<QuestionApiResponse> {
          const response = await voxdemApi.get<QuestionApiResponse>('/questions');
          return response.data;
     },

     async getProfileAttributes(): Promise<ProfileAttributesApiResponse> {
          const response = await voxdemApi.get<ProfileAttributesApiResponse>('/profile-attributes');
          return response.data;
     },

     async getChartData(questionCode: string): Promise<ChartApiResponse> {
          const response = await voxdemApi.get<ChartApiResponse>(`/chart/${questionCode}`);
          return response.data;
     },

     async getChartDataByProfileAttribute(questionCode: string, profileAttribute: string): Promise<ChartApiResponse> {
          const response = await voxdemApi.get<ChartApiResponse>(`/chart/${questionCode}/${profileAttribute}`);
          return response.data;
     },
};