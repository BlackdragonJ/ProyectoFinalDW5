import CustomerForm from '@/app/ui/customers/form';
import { updateCustomer } from '@/app/lib/actions';
import { fetchCustomersById } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer',
};
export default async function Page({ params }: { params: { id: string } }) {
  const customer = await fetchCustomersById(params.id);

  if (!customer) {
    return <p>Customer not found</p>;
  }

  async function updateAction(formData: FormData) {
    'use server';
    await updateCustomer(params.id, formData);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Customer</h1>
      <CustomerForm
        customer={customer}
        action={updateAction}
        submitText="Update"
      />
    </div>
  );
}
