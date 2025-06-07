import { NextResponse } from 'next/server';
import supplements from '@/data/supplements.json';

export async function GET() {
  return NextResponse.json(supplements);
}
