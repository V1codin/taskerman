import cls from 'classnames';

import { useBackGround } from '@/hooks/useBackGround';
import { boardService } from '@/libs/boards.service';
import { dbConnect } from '@/libs/db/connect';

import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: { boardId: string };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Board',
    description: 'App for creating tasks and assignin them to people',
  };
}

export default async function RootLayout({
  children,
  params: { boardId },
}: Props) {
  await dbConnect();
  const bg = await boardService.getBoardBackgroundById(boardId);

  const style = useBackGround(bg || '');

  return (
    <div
      className={cls('p-4', {
        'w-[calc(100vw - var(--scrollbar-width))]': bg,
        'h-screen': bg,
      })}
      style={style}
    >
      <section className="py-0 px-5 relative">{children}</section>
    </div>
  );
}
