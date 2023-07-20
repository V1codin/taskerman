type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div className="absolute top-0 left-0 bg-[#000000a2] min-h-screen w-full h-[auto]">
      {children}
    </div>
  );
}
