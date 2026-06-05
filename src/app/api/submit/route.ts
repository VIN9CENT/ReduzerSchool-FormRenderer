import { NextRequest, NextResponse } from 'next/server';
import { ApplicationSubmissionService } from './ApplicationSubmissionService';

export async function POST(req: NextRequest) {
  const service = new ApplicationSubmissionService();
  const body = await req.json();

  if (!body.email || !body.posthog_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const { alreadyApplied } = await service.submit(body);
    if (alreadyApplied) {
      return NextResponse.json({ error: 'Already applied' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission failed:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
