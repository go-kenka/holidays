import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), 'data', 'holidays');
  const files = fs.readdirSync(dataDir);
  
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      year: file.replace('.json', ''),
    }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year } = await params;
    const filePath = path.join(process.cwd(), 'data', 'holidays', `${year}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Holiday data for year ${year} not found.` },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const holidayData = JSON.parse(fileContent);

    return NextResponse.json(holidayData);
  } catch (error) {
    console.error('Error fetching holiday data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
