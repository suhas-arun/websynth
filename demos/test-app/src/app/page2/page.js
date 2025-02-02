import Link from "next/link";

export default function Page2() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">📄 Page 2</h1>
      <p>This is the second page.</p>
      <div className="mt-4 flex gap-4 justify-center">
        <Link href="/">
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Back to Home
          </button>
        </Link>
        <Link href="/page1">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Page 1
          </button>
        </Link>
      </div>
    </div>
  );
}
