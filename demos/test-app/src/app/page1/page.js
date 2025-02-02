import Link from "next/link";

export default function Page1() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">📄 Page 1</h1>
      <p>This is the first page.</p>
      <div className="mt-4 flex gap-4 justify-center">
        <Link href="/">
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Back to Home
          </button>
        </Link>
        <Link href="/page2">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Go to Page 2
          </button>
        </Link>
      </div>
    </div>
  );
}
