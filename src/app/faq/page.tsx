'use client';

import { useEffect } from 'react';

export default function FAQRedirect() {
  useEffect(() => {
    window.location.href = 'https://notion.so/Platform-FAQ-2851db358b4e804da516f6d1ed8f760b';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Redirecting to FAQ...</p>
        <p className="mt-4">
          If you are not redirected automatically, please{' '}
          <a 
            href="https://notion.so/Platform-FAQ-2851db358b4e804da516f6d1ed8f760b"
            className="text-blue-600 hover:underline"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

