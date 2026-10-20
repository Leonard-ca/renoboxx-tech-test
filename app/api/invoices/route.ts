import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendInvoiceEmail } from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

type Item = { title: string; price: number; quantity: number };

// Creates an invoice for a finished job and emails it to the customer.
export async function POST(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId, items, customerEmail } = (await req.json()) as {
    jobId: string;
    items: Item[];
    customerEmail: string;
  };

  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  let net = 0;
  for (const item of items) {
    net += item.price * item.quantity;
  }
  const vat = net * 0.19;
  const gross = net + vat;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const { data: invoice } = await supabase
    .from('invoices')
    .insert({
      job_id: job.id,
      betrieb_id: job.betrieb_id,
      number: `RE-${Date.now()}`,
      items,
      net,
      vat,
      gross,
      due_date: dueDate.toISOString().split('T')[0],
      status: 'sent',
    })
    .select()
    .single();

  sendInvoiceEmail(customerEmail, invoice);

  console.log('Invoice created', { invoice, user, token });

  return NextResponse.json(invoice);
}
