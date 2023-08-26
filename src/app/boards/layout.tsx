import cls from 'classnames';

const defaultContainerClasses = `flex flex-wrap mx-auto my-0 bg-none mobile:block tablet:justify-center`;

export const metadata = {
  title: 'Tasker Boards',
  description: 'App for creating tasks and assignin them to people',
};

type Props = {
  children: React.ReactNode;
};

export default async function BoardsLayout({ children }: Props) {
  return <div className={cls(defaultContainerClasses)}>{children}</div>;
}
