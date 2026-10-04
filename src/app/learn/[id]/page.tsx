import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/LessonPlayer";
import { getLesson, lessons } from "@/lessons";

export function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getLesson(id)) notFound();
  return <LessonPlayer key={id} lessonId={id} />;
}
