/**
 * Generate Schema.org SoftwareApplication structured data
 */
export function getSoftwareSchema(name: string, url: string, description: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `PDFCraft - ${name}`,
    url: `https://pdf.aixiaot.com${url}`,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  });
}
