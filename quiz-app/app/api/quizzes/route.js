import prisma from '@/lib/prisma'

export async function GET() {
    const quizzes = await prisma.quiz.findMany({
        include: { questions: true }
    });
    return Response.json(quizzes);
}

export async function POST(req) {
    const body = await req.json();

    const quiz = await prisma.quiz.create({
        data: {
            title: body.title,
            questions: {
                create: body.questions.map(q => ({
                    question: q.question,
                    options: JSON.stringify(q.options),
                    answer: q.answer
                }))
            }

        },
        include: { questions: true }
    });

    return Response.json(quiz);
}
