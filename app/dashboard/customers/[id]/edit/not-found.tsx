import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="rounded-md bg-red-50 p-6">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-lg font-semibold text-red-700">Customer not found</h2>
      <p className="mt-2 text-sm text-red-800">
        Could not find the requested customer.
      </p>
      <Link
        href="/dashboard/customers"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </div>
  );
}
