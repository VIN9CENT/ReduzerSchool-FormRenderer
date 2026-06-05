import { NextRequest, NextResponse } from 'next/server';
import { ApplicationSubmissionService } from './ApplicationSubmissionService';

const service = new ApplicationSubmissionService();

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email || !body.posthog_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await service.submit(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission failed:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
