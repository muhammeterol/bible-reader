import ReaderToolbar from "@/app/components/ReaderToolbar";

export default function AboutPage() {
  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>About</h1>
        <p style={{ opacity: 0.9 }}>
          This is a simple KJV Bible reading website. The goal is fast, distraction-free reading with
          basic tools like search and readable typography.
        </p>

        <p style={{ opacity: 0.85, marginTop: 12 }}>
          If you find it useful, you can support the project via the Donate button.
        </p>
      </main>
    </>
  );
}
