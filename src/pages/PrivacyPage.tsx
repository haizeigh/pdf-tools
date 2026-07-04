import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-8">Privacy Policy</h1>

      <div className="prose prose-surface max-w-none space-y-6">
        <p className="text-surface-500">Last updated: July 4, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">1. Information We Collect</h2>
          <p className="text-surface-500">PDFCraft does not collect, store, or transmit any personal information. All PDF processing happens entirely in your browser using client-side JavaScript. Your files never leave your device.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">2. How We Process Your Files</h2>
          <p className="text-surface-500">When you upload a PDF file to our tools, the file is processed locally in your browser using JavaScript libraries such as pdf-lib and pdfjs-dist. The file is never sent to any server. Once you close the page or refresh, all data is cleared from memory.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">3. Third-Party Services</h2>
          <p className="text-surface-500">We use the following third-party services:</p>
          <ul className="list-disc pl-6 text-surface-500">
            <li><strong>Google AdSense</strong> — Used to display advertisements. AdSense may use cookies to serve personalized ads. See Google's Privacy Policy for more information.</li>
            <li><strong>Google Analytics (GA4)</strong> — Used to understand how visitors use our site. Collects anonymized data such as page views, session duration, and browser type. No personal information is collected.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">4. Cookies</h2>
          <p className="text-surface-500">PDFCraft itself does not use cookies. However, Google AdSense and Google Analytics may use cookies to function properly. You can manage your cookie preferences through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">5. Data Security</h2>
          <p className="text-surface-500">Since all file processing occurs locally in your browser, there is no risk of data interception during transmission or storage on our servers. We do not have access to your files at any point.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">6. Children's Privacy</h2>
          <p className="text-surface-500">Our services are not directed to children under the age of 13. We do not knowingly collect any personal information from children.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">7. Changes to This Policy</h2>
          <p className="text-surface-500">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-surface-800">8. Contact</h2>
          <p className="text-surface-500">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@aixiaot.com" className="text-brand-600 hover:text-brand-700 underline">support@aixiaot.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
