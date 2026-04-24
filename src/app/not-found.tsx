import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="section-label text-gt-green mb-4">{"// 404"}</p>
      <h1
        className="text-gt-text font-extrabold mb-4"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        Page Not Found
      </h1>
      <p className="text-gt-muted text-lg max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Button variant="primary" size="lg" href="/">
        Back to Home
      </Button>
    </div>
  );
}
