import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // ya existe, la reutilizamos

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      
      {/* tabla */}
      <div className="mt-6">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    </div>
  );
}
