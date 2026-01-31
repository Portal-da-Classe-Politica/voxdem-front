import { voxdemApi } from '../lib/api';
import { QuestionApiResponse } from '../types/question';
import { ProfileAttributesApiResponse } from '../types/porfileAttributes';
import { ChartApiResponse } from '../types/chart';
import { SurveyApiResponse } from '../types/survey';

export const graphService = {
     async getSurveys(): Promise<SurveyApiResponse> {
          const response = await voxdemApi.get<SurveyApiResponse>('/surveys');
          return response.data;
     },

     async getQuestions(surveyId?: number): Promise<QuestionApiResponse> {
          const params = surveyId ? { surveyId } : {};
          const response = await voxdemApi.get<QuestionApiResponse>('/questions', { params });
          return response.data;
     },

     async getProfileAttributes(): Promise<ProfileAttributesApiResponse> {
          const response = await voxdemApi.get<ProfileAttributesApiResponse>('/profile-attributes');
          return response.data;
     },

     async getChartData(questionCode: string, surveyId?: number): Promise<ChartApiResponse> {
          const params = surveyId ? { surveyId } : {};
          const response = await voxdemApi.get<ChartApiResponse>(`/chart/${questionCode}`, { params });
          return response.data;
     },

     async getChartDataByProfileAttribute(questionCode: string, profileAttribute: string, surveyId?: number): Promise<ChartApiResponse> {
          const params = surveyId ? { surveyId } : {};
          const response = await voxdemApi.get<ChartApiResponse>(`/chart/${questionCode}/${profileAttribute}`, { params });
          return response.data;
     },
};