type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <section className="max-w-[80%] mt-4 mx-[auto] p-3 border border-red">
      {children}
    </section>
  );
}
