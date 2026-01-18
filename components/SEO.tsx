import React from 'react';
import { BUSINESS_INFO } from '../constants';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article';
    schema?: Record<string, any>;
}

const DOMAIN = 'https://loaiza5aluminum.online';

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    image = '/image_0.jpg',
    type = 'website',
    schema
}) => {
    const fullTitle = `${title} | ${BUSINESS_INFO.name}`;
    const fullUrl = canonical ? `${DOMAIN}${canonical}` : DOMAIN;
    const fullImage = image.startsWith('http') ? image : `${DOMAIN}${image}`;

    // Default LocalBusiness Schema
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": BUSINESS_INFO.name,
        "image": `${DOMAIN}/image_0.jpg`,
        "@id": DOMAIN,
        "url": DOMAIN,
        "telephone": BUSINESS_INFO.phone,
        "email": BUSINESS_INFO.email,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tampa",
            "addressRegion": "FL",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 27.9506,
            "longitude": -82.4572
        },
        "areaServed": [
            { "@type": "City", "name": "Tampa" },
            { "@type": "City", "name": "Orlando" },
            { "@type": "City", "name": "Sarasota" },
            { "@type": "City", "name": "Fort Myers" },
            { "@type": "State", "name": "Florida" }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        }
    };

    const jsonLd = schema ? { ...defaultSchema, ...schema } : defaultSchema;

    return (
        <>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </>
    );
};

export default SEO;
