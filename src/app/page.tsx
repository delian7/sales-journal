import Head from 'next/head';
import JournalEntriesTable from "./components/JournalEntriesTable";

export default function Home() {
  return (
    <div className="mx-auto bg-blue-100">
      <Head>
        <title>Sales Journal Entries</title>
        <meta name="description" content="Sales Journal Entries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='p-4 text-black text-center text-4xl font-semibold'>Sales Journal Entries</h1>
        <JournalEntriesTable />
      </main>
    </div>
  );
}
