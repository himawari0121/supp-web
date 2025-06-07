import { NextResponse } from 'next/server';
import interactions from '@/data/interactions.json';

export async function GET() {
  return NextResponse.json(interactions);
}
