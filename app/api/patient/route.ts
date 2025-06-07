import { NextResponse } from 'next/server';
import patient from '@/data/patient.json';

export async function GET() {
  return NextResponse.json(patient);
}
