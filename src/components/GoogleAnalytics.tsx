'use client';

import Script from 'next/script';

/** GA4 ID format regex: G-XXXXXXXXXX or UA-XXXXXXXX-X */
const GA_ID_PATTERN = /^(G-[A-Z0-9]+|UA-\d+-\d+)$/;

/**
 * Validate Google Analytics ID format
 * @param id - The GA ID to validate
 * @returns true if the ID matches GA4 or Universal Analytics format
 */
function isValidGaId(id: string): boolean {
  return GA_ID_PATTERN.test(id);
}

/**
 * Google Analytics 4 Component
 * Loads GA4 tracking script and handles basic page view tracking
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  // Don't render if no GA ID is provided or if it's invalid
  if (!gaId || !isValidGaId(gaId)) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
