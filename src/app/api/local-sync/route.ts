import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    // Only allow this in development mode to avoid overwriting production files
    // (though in serverless prod this wouldn't persist anyway, better safe than sorry)
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ success: true, message: "Skipped in production" });
    }

    try {
        const body = await request.json();
        const { type, data } = body;

        if (!['projects', 'blogs', 'articles'].includes(type)) {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const fileName = type === 'projects' ? 'data.json' : `${type}.json`;
        const filePath = path.join(process.cwd(), 'src', 'lib', fileName);

        await fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf-8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Local sync failed:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
