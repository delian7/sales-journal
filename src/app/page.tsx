'use client'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import MonthsList from "./components/MonthsList";
import JournalEntriesTable from "./components/JournalEntriesTable";
import LoginForm from './components/LoginForm';
import Spinner from './components/Spinner';

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleMonthClick = (month: string | null) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    setLoggedIn(localStorage && localStorage.getItem('access-token') !== null);
    setLoading(false);
  }, []);

  return (
    <div className="mx-auto bg-blue-100 min-h-screen py-8">
      <Head>
        <title>Sales Journal Entries</title>
        <meta name="description" content="Sales Journal Entries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? <Spinner /> : (
        loggedIn ? (
          <main className='flex flex-col items-center justify-center bg-blue-100'>
            <h1 className='p-4 text-black text-center text-4xl font-semibold'>Sales Journal Entries</h1>
            {!selectedMonth && <MonthsList onMonthClick={handleMonthClick} />}
            {selectedMonth && <JournalEntriesTable onBack={handleMonthClick} monthAndYear={selectedMonth} />}
          </main>
        ) : <LoginForm setLoggedIn={ setLoggedIn }/>
      )}

    </div>
  );
}
