import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website' }) => {
  const siteTitle = 'ACADOME';
  const fullTitle = title ? `${title} | ${siteTitle}` : 'ACADOME – Professional Accounting & Finance Training Institute';
  const defaultDesc = "Practical finance training with real software exposure. Join ACADOME for job-oriented accounting courses and structured internship pathways in India and GCC.";
  const siteUrl = 'https://acadome.in'; // Replace with actual URL
  const defaultImage = `${siteUrl}/images/acadome-seo-preview.jpg`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Additional SEO tags */}
      <link rel="canonical" href={url || siteUrl} />
    </Helmet>
  );
};

export default SEO;
