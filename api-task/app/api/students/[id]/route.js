import { NextResponse } from 'next/server';

let students = [
  { id: '1', name: 'Feride', age: 20 },
  { id: '2', name: 'Humbet', age: 20 },
];

export async function GET(req, { params }) {
  const student = students.find(s => s.id === params.id);
  if (!student) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(student);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const index = students.findIndex(s => s.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  students[index] = { ...students[index], ...body };
  return NextResponse.json(students[index]);
}

export async function DELETE(req, { params }) {
  students = students.filter(s => s.id !== params.id);
  return NextResponse.json({ success: true });
}
