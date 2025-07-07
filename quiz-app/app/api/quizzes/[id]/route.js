import prisma from '@/lib/prisma'

export async function GET(req, { params }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(params.id) },
    include: { questions: true }
  });

  return Response.json(quiz);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const quizId = Number(params.id);

  await prisma.question.deleteMany({ where: { quizId } });

  const quiz = await prisma.quiz.update({
    where: { id: quizId },
    data: {
      title: body.title,
      questions: {
        create: body.questions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.answer
        }))
      }
    },
    include: { questions: true }
  });

  return Response.json(quiz);
}
