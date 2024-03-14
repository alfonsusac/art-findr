export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      Home Page
      <div className="flex gap-2 mt-4">
        <a href="/123"> Art Page</a>
        <a href="/login"> Login Page</a>
      </div>
    </main>
  );
}
