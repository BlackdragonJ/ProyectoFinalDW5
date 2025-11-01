import CustomerForm from '@/app/ui/customers/form';
import { createCustomer } from '@/app/lib/actions';

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Create Customer</h1>
      <CustomerForm action={createCustomer} submitText="Create" />
    </div>
  );
}
