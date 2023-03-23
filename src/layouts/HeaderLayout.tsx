import CustomHead from '@/modules/head/Head';
import Header from '@/views/Header';

type Props = {
  children: React.ReactNode;
};

export default function HeaderLayout({ children }: Props) {
  return (
    <>
      <CustomHead />
      <Header />
      <main>{children}</main>
    </>
  );
}
