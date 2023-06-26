'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>The requested board was not found!</h2>
    </div>
  );
}
