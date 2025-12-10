import { NextResponse } from 'next/server';
import { STORIES } from '@/lib/data';

export async function GET() {
    return NextResponse.json(STORIES);
}
