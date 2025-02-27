import React from "react";
import { JournalEntry } from "./JournalEntriesTable";


interface JournalTableProps {
  data: JournalEntry;
}

const JournalTable: React.FC<JournalTableProps> = ({ data }) => {
  const rows = [
    { account: "Accounts Receivable", debit: data.accounts_receivable_orders.debit, credit: 0, description: data.accounts_receivable_orders.description },
    { account: "Revenue", debit: 0, credit: data.revenue.credit, description: data.revenue.description },
    { account: "Accounts Receivable", debit: data.accounts_receivable_shipping.debit, credit: 0, description: data.accounts_receivable_shipping.description },
    { account: "Shipping Revenue", debit: 0, credit: data.shipping_revenue.credit, description: data.shipping_revenue.description },
    { account: "Accounts Receivable", debit: data.accounts_receivable_taxes.debit, credit: 0, description: data.accounts_receivable_taxes.description },
    { account: "Sales Tax Payable", debit: 0, credit: data.sales_tax_payable.credit, description: data.sales_tax_payable.description },
    { account: "Cash", debit: data.cash.debit, credit: 0, description: data.cash.description },
    { account: "Accounts Receivable", debit: 0, credit: data.accounts_receivable_settled.credit, description: data.accounts_receivable_settled.description }
  ];

  return (
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
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border border-gray-200">{row.account}</td>
            <td className="py-2 px-4 border border-gray-200">{row.debit != 0 ? row.debit.toFixed(2) : ''}</td>
            <td className="py-2 px-4 border border-gray-200">{row.credit != 0 ? row.credit.toFixed(2) : ''}</td>
            <td className="py-2 px-4 border border-gray-200">{row.description}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="py-2 px-4 border border-gray-200 font-bold">Total</td>
          <td className="py-2 px-4 border border-gray-200 font-bold">
            {rows.reduce((sum, row) => sum + row.debit, 0).toFixed(2)}
          </td>
          <td className="py-2 px-4 border border-gray-200 font-bold">
            {rows.reduce((sum, row) => sum + row.credit, 0).toFixed(2)}
          </td>
          <td className="py-2 px-4 border border-gray-200"></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default JournalTable;
