import cls from 'classnames';

import { useBackGround } from '@/hooks/useBackGround';
import { boardService } from '@/libs/boards.service';

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
  // ? checking in the layout because
  // ? of not displaying board background if there is no session

  const bg = await boardService.getBoardBackgroundById(boardId);

  const style = useBackGround(bg || '');

  return (
    <div
      className={cls('p-4', {
        'w-screen': bg,
        'h-[calc(100vh_-_var(--header-height))]': bg,
      })}
      style={style}
    >
      <section className="py-0 px-6 relative overflow-y-scroll h-full">
        {children}
      </section>
    </div>
  );
}
