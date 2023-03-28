import CustomHead from '@/modules/head/CustomHead';
import Header from '@/views/Header/Header';

type HeaderLayoutProps = {
  children: React.ReactNode;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <CustomHead />
      <Header />
      <main>{children}</main>
    </>
  );
};
export default HeaderLayout;
