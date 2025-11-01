'use client';

import { useState } from 'react';

export default function CustomerForm({
  customer,
  action,
  submitText,
}: {
  customer?: { id?: string; name?: string; email?: string; image_url?: string | null };
  action: (formData: FormData) => void;
  submitText: string;
}) {
  const [name, setName] = useState(customer?.name ?? '');
  const [email, setEmail] = useState(customer?.email ?? '');
  const [imageUrl, setImageUrl] = useState(customer?.image_url ?? '');

  return (
    <form action={action} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
        <input
          name="image_url"
          value={imageUrl ?? ''}
          onChange={e => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
