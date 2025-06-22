import { NextResponse } from 'next/server';

let students = [
  { id: '1', name: 'Feride', age: 20 },
  { id: '2', name: 'Humbet', age: 20 },
];

export async function GET() {
  return NextResponse.json(students);
}

export async function POST(req) {
  const body = await req.json();
  const newStudent = { ...body, id: Date.now().toString() };
  students.push(newStudent);
  return NextResponse.json(newStudent, { status: 201 });
}
