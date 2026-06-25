import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6 text-center px-4">
      <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
        <FileQuestion className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or didn&apos;t exist in the first place.
        </p>
      </div>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
