export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {children}
    </main>
  );
}
