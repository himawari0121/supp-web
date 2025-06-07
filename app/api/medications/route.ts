import { NextResponse } from 'next/server';
import medications from '@/data/medications.json';

export async function GET() {
  return NextResponse.json(medications);
}
