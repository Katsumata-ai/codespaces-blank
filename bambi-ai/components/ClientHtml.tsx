'use client';

import React, { useEffect, useState } from 'react';

interface ClientHtmlProps {
  children: React.ReactNode;
  lang: string;
  className: string;
  translate: string;
  inter: string;
}

export default function ClientHtml({ children, lang, className, translate, inter }: ClientHtmlProps) {
  // État pour suivre si nous sommes côté client
  const [isClient, setIsClient] = useState(false);

  // Effet pour marquer que nous sommes côté client après le montage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pendant le rendu serveur ou la première hydratation, utiliser suppressHydrationWarning
  if (!isClient) {
    return (
      <html lang={lang} className={className} translate={translate} suppressHydrationWarning>
        <body className={inter}>{children}</body>
      </html>
    );
  }

  // Une fois que nous sommes côté client, nous pouvons rendre normalement
  return (
    <html lang={lang} className={className} translate={translate}>
      <body className={inter}>{children}</body>
    </html>
  );
}
