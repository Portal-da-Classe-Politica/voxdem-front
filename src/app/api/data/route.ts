import { NextRequest, NextResponse } from 'next/server';
import { graphService } from '../../../services/graphService';

export async function GET() {
  try {
    const [questionsResponse, profileAttributesResponse] = await Promise.all([
      graphService.getQuestions(),
      graphService.getProfileAttributes()
    ]);

    return NextResponse.json({
      questions: questionsResponse,
      profileAttributes: profileAttributesResponse
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
