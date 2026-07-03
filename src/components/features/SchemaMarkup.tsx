import { getSoftwareSchema } from '../../utils/schema';

export function SchemaMarkup({ name, url, description }: { name: string; url: string; description: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: getSoftwareSchema(name, url, description) }}
    />
  );
}
