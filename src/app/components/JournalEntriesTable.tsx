'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface JournalEntry {
  month: string;
  accounts_receivable: {
    debit: number;
    credit: number;
  };
  revenue: {
    credit: number;
  };
  shipping_revenue: {
    credit: number;
  };
  sales_tax_payable: {
    credit: number;
  };
  cash: {
    debit: number;
  };
}

const JournalEntriesTable: React.FC = () => {

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/journal_entries', {
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'px3MY3a2_zojecNxaG1i_A',
            'client': '0IMSXFzIWqgKHgwELPz52g',
            'uid': 'test@example.com'
          }
        });
        setJournalEntries(response.data.journal_entries);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 text-black shadow-lg">
      {journalEntries.map((entry, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold mb-4">{entry.month} Journal Entry:</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Account</th>
                <th className="py-2 px-4 border-b">Debit</th>
                <th className="py-2 px-4 border-b">Credit</th>
                <th className="py-2 px-4 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Accounts Receivable</td>
                <td className="py-2 px-4 border-b">{entry.accounts_receivable.debit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">Cash expected for orders</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Revenue</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">{entry.revenue.credit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">Revenue for orders</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Accounts Receivable</td>
                <td className="py-2 px-4 border-b">{entry.shipping_revenue.credit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">Cash expected for shipping on orders</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Shipping Revenue</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">{entry.shipping_revenue.credit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">Revenue for shipping</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Accounts Receivable</td>
                <td className="py-2 px-4 border-b">{entry.sales_tax_payable.credit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">Cash expected for taxes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Sales Tax Payable</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">{entry.sales_tax_payable.credit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">Cash to be paid for sales tax</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Cash</td>
                <td className="py-2 px-4 border-b">{entry.cash.debit.toFixed(2)}</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">Cash received</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Accounts Receivable</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">{(entry.accounts_receivable.debit + entry.shipping_revenue.credit + entry.sales_tax_payable.credit).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">Removal of expectation of cash</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Total</td>
                <td className="py-2 px-4 border-b font-bold">{(entry.accounts_receivable.debit + entry.shipping_revenue.credit + entry.sales_tax_payable.credit + entry.cash.debit).toFixed(2)}</td>
                <td className="py-2 px-4 border-b font-bold">{(entry.revenue.credit + entry.shipping_revenue.credit + entry.sales_tax_payable.credit + entry.accounts_receivable.debit).toFixed(2)}</td>
                <td className="py-2 px-4 border-b"></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default JournalEntriesTable;