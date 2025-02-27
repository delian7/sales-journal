'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:3000/api/v1/journal_entries', {
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
        {months.map((month, index) => (
          <li
            key={index}
            className="cursor-pointer text-blue-500 hover:text-blue-700 underline"
            onClick={() => onMonthClick(month)}
          >
            {month}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthsList;