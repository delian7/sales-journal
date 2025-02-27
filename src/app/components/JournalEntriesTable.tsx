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

interface JournalEntriesTableProps {
  monthAndYear: string;
  onBack: (month: string | null) => void;
}

const JournalEntriesTable: React.FC<JournalEntriesTableProps> = ({ monthAndYear, onBack }) => {

  const [journalEntry, setJournalEntry] = useState<JournalEntry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [year, month] = monthAndYear.split('-');

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/journal_entries/${year}/${month}`, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'uid': localStorage.getItem('uid')
          }
        });

        setJournalEntry(response.data.journal_entry);
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
  }, [month, year]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 text-black">
      <button onClick={() => onBack(null)} className="mb-4 text-blue-500 hover:underline">Back to Months</button>
      <h2 className="text-2xl font-semibold mb-4">Journal Entries for {monthAndYear}</h2>
      <div className="mb-8">
        {journalEntry ? (
          <>
            <h3 className="text-xl font-bold mb-4">{journalEntry.month} Journal Entry:</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-200">Account</th>
                  <th className="py-2 px-4 border border-gray-200">Debit</th>
                  <th className="py-2 px-4 border border-gray-200">Credit</th>
                  <th className="py-2 px-4 border border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Accounts Receivable</td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.accounts_receivable.debit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">Cash expected for orders</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Revenue</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.revenue.credit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200">Revenue for orders</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Accounts Receivable</td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.shipping_revenue.credit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">Cash expected for shipping on orders</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Shipping Revenue</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.shipping_revenue.credit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200">Revenue for shipping</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Accounts Receivable</td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.sales_tax_payable.credit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">Cash expected for taxes</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Sales Tax Payable</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.sales_tax_payable.credit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200">Cash to be paid for sales tax</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Cash</td>
                  <td className="py-2 px-4 border border-gray-200">{journalEntry.cash.debit.toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">Cash received</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Accounts Receivable</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                  <td className="py-2 px-4 border border-gray-200">{(journalEntry.accounts_receivable.debit + journalEntry.shipping_revenue.credit + journalEntry.sales_tax_payable.credit).toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200">Removal of expectation of cash</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-gray-200 font-bold">Total</td>
                  <td className="py-2 px-4 border border-gray-200 font-bold">{(journalEntry.accounts_receivable.debit + journalEntry.shipping_revenue.credit + journalEntry.sales_tax_payable.credit + journalEntry.cash.debit).toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200 font-bold">{(journalEntry.revenue.credit + journalEntry.shipping_revenue.credit + journalEntry.sales_tax_payable.credit + journalEntry.accounts_receivable.debit).toFixed(2)}</td>
                  <td className="py-2 px-4 border border-gray-200"></td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default JournalEntriesTable;