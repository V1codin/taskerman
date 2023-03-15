import HeaderLayout from '@/layouts/HeaderLayout';

import { dbProvider } from '@/db/dbProvider';

export default function Home({ isConnected }: { isConnected: boolean }) {
  return (
    <HeaderLayout>
      <main></main>
    </HeaderLayout>
  );
}

export async function getServerSideProps() {
  try {
    await dbProvider.connect({
      uri: process.env['MONGO_DB_URI']!,
    });

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
