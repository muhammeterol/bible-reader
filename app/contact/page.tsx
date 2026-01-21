import ReaderToolbar from "@/app/components/ReaderToolbar";

export default function ContactPage() {
  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Contact</h1>

        <p style={{ opacity: 0.9 }}>
          For feedback, bug reports, or feature requests, contact:
        </p>

        <p style={{ marginTop: 10 }}>
          <strong>Email:</strong>{" "}
          <a href="mailto:you@example.com">you@example.com</a>
        </p>

        <p style={{ opacity: 0.8, marginTop: 12 }}>
          (Replace this email with your own.)
        </p>
      </main>
    </>
  );
}
