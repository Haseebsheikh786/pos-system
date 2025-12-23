import { SEOProps } from "@/types/seo";

export default function SEO({
  title,
  description,
  keywords = ["wellness"],
  image = "/og-default.jpg",
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freshprep.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={author} />

      {/* Robots */}
      <meta
        name="robots"
        content={`${noindex ? "noindex" : "index"}, ${
          nofollow ? "nofollow" : "follow"
        }`}
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="FreshPrep" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@freshprep" />

      {/* Article-specific (optional) */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </>
  );
}
