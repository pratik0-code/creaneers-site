import { NextResponse } from 'next/server';
import { STORIES } from '@/lib/data';

export const dynamic = "force-static";

export async function GET() {
    return NextResponse.json(STORIES);
}
