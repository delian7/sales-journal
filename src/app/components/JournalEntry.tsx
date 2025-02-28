'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JournalTable from './JournalTable';

export interface JournalEntry {
  month: string,
  accounts_receivable_orders: {
    debit: number;
    description: string;
  };
  revenue: {
    credit: number;
    description: string;
  };
  accounts_receivable_shipping: {
    debit: number;
    description: string;
  };
  shipping_revenue: {
    credit: number;
    description: string;
  };
  accounts_receivable_taxes: {
    debit: number;
    description: string;
  };
  sales_tax_payable: {
    credit: number;
    description: string;
  };
  cash: {
    debit: number;
    description: string;
  };
  accounts_receivable_settled: {
    credit: number;
    description: string;
  };
}

interface JournalEntryProps {
  monthAndYear: string;
  onBack: (month: string | null) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ monthAndYear, onBack }) => {

  const [journalEntry, setJournalEntry] = useState<JournalEntry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [year, month] = monthAndYear.split('-');

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/journal_entries/${year}/${month}`, {
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
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">{journalEntry?.month} Journal Entry:</h3>
        {journalEntry && <JournalTable data={journalEntry} />}
      </div>
    </div>
  );
};

export default JournalEntry;