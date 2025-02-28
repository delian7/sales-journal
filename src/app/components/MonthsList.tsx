'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';

interface MonthsListProps {
  onMonthClick: (month: string) => void;
}

const MonthsList: React.FC<MonthsListProps> = ({ onMonthClick }) => {
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/journal_entries`, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'uid': localStorage.getItem('uid')
          }
        });
        setMonths(response.data.months);
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

    fetchMonths();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 text-black">
      <ul className="space-y-2">
      {months.map((month, index) => {
          const formattedMonth = format(parse(month, 'yyyy-MM', new Date()), 'MMMM yyyy');
          return (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700"
                onClick={() => onMonthClick(month)}
              >
                {formattedMonth}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonthsList;