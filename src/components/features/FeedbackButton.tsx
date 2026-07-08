export function FeedbackButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSeBTEBE7AvCrPte2QS9D3IhXmLScZAkDgsVa4uVzAW5oPrGig/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-600 text-white text-sm font-medium shadow-lg hover:bg-brand-700 hover:shadow-xl transition-all"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      Feedback
    </a>
  );
}
