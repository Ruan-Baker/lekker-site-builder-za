
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoStructuredData = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lekker Sites - South Africa's #1 Free Website Builder",
    "alternateName": "Lekker Sites",
    "url": "https://lekkersites.co.za",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lekkersites.co.za/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Create professional websites in minutes with South Africa's best free website builder and funnel creator. No hidden fees."
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lekker Sites",
    "url": "https://lekkersites.co.za",
    "logo": "https://lekkersites.co.za/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+27-800-123-456",
      "contactType": "customer service",
      "areaServed": "ZA",
      "availableLanguage": ["en", "af", "zu", "xh"]
    },
    "sameAs": [
      "https://www.facebook.com/lekkersites",
      "https://www.twitter.com/lekker_sites",
      "https://www.instagram.com/lekkersites",
      "https://www.linkedin.com/company/lekker-sites"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Lekker Sites really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Lekker Sites is 100% free for South African businesses. There are no hidden fees or premium upgrades required."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need coding knowledge to use Lekker Sites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, our drag-and-drop builder makes it easy to create professional websites without any coding knowledge."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sell products with Lekker Sites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Lekker Sites includes full e-commerce functionality with South African payment gateways like PayFast, Peach Payments, and Yoco."
        }
      },
      {
        "@type": "Question",
        "name": "How does Lekker Sites compare to Wix or WordPress for South African businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike international platforms, Lekker Sites is designed specifically for South African businesses with local payment integrations, faster loading times on SA servers, and completely free with no hidden charges or currency conversion surprises."
        }
      }
    ]
  };

  return (
    <Helmet>
      <meta name="description" content="Create professional websites in minutes with South Africa's best free website builder and funnel creator. No credit card, no hidden fees - designed for SA businesses." />
      <meta name="keywords" content="website builder South Africa, free website builder, South African website creator, ecommerce website builder SA, sales funnel builder South Africa" />
      
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default SeoStructuredData;
