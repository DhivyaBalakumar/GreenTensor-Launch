// Standalone layout for print pages — no site header, footer, or background effects
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
