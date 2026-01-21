import ReaderToolbar from "@/app/components/ReaderToolbar";

export default function PrivacyPage() {
  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Privacy Policy</h1>

        <p style={{ opacity: 0.9 }}>
          We respect your privacy. This site is designed to work without requiring an account.
        </p>

        <h2 style={{ fontSize: 18, marginTop: 18 }}>Data we store</h2>
        <ul>
          <li>
            <strong>Local settings:</strong> Theme and font size may be saved in your browser (localStorage).
          </li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 18 }}>Analytics</h2>
        <p style={{ opacity: 0.9 }}>
          We may use basic analytics in the future to understand traffic and improve the website. If added,
          this policy will be updated.
        </p>

        <h2 style={{ fontSize: 18, marginTop: 18 }}>Contact</h2>
        <p style={{ opacity: 0.9 }}>
          If you have questions about privacy, please use the Contact page.
        </p>
      </main>
    </>
  );
}
