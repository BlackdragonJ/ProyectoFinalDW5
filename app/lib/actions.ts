'use server';
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

//esquema para Customers

const CustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  image_url: z.string().optional(), 
})

//esquema para Invoices
const FormSchema = z.object({
    id: z.string({
        invalid_type_error: 'Please select a customer',
    }),
    customerId: z.string(),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0'}),
    status: z.enum(['pending','paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

//funciones para Customers
export async function createCustomer(formData: FormData){
  const validatedFields = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, image_url } = validatedFields.data;
  const imageUrl = image_url && image_url.length > 0 ? image_url : null;

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imageUrl});
    `;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Database Error');
  }

  redirect('/dashboard/customers');
}

export async function updateCustomer(id: string, formData: FormData){
  const validatedFields = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url') ?? null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, image_url } = validatedFields.data;
  const imageUrl = image_url && image_url.length > 0 ? image_url : null;

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${imageUrl}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Database Error: Failed to create Customer');
  }

  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id};`;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw new Error('Database Error: Failed to delete Customer');
  }

  redirect('/dashboard/customers');
}

// funciones para Invoice
export async function createInvoice(prevState: State, formData: FormData){
        const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
 
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try{
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch(error){
        console.error(error);
        throw new Error('Database error: Failed to Create Invoice');  
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

    try{
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    }catch(error){
        console.error(error);
        throw new Error('Failed to Delete Invoice');
    }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}