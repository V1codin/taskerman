
export const metadata = {
  title: 'Tasker Boards',
  description: 'App for creating tasks and assignin them to people',
};

type Props = {
  children: React.ReactNode;
};

export default async function BoardsLayout({ children }: Props) {
  return <>{children}</>;
}
