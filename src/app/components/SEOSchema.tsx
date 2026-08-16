import React from 'react';

export function HowItWorksSEO() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How Haptic Feedback Works in VR Gaming',
    description: 'Learn the science behind haptic feedback in VR gaming — actuators, vibration motors, force feedback, and latency.',
    url: 'https://hapticvr.edu',
    isPartOf: {
      '@type': 'WebSite',
      name: 'HapticVR',
      url: 'https://hapticvr.edu',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HapticVR',
    url: 'https://hapticvr.edu',
    logo: 'https://hapticvr.edu/assets/images/app_logo.png',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}