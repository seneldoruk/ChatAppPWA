export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ border: "1px solid white", maxWidth: "640px", width: "100%" }}
    >
      {children}
    </div>
  );
}
