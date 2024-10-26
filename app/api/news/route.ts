import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
  try {
    const newsList = await prisma.news.findMany();
    return NextResponse.json(newsList);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { instansi, tarif, startDate, endDate, status } = await request.json();
        const newNews = await prisma.news.create({
            data: {
                instansi,
                tarif,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
            },
        });
        return NextResponse.json(newNews);
    } catch (error) {
        console.error('Error creating news:', error);
        return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
    }
}


export async function PUT(request: Request) {
  try {
    const { id, instansi, tarif, startDate, endDate, status } = await request.json();
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        instansi,
        tarif,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      },
    });
    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.news.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
