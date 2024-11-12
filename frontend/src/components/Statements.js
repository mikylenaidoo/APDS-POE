import React from 'react';
import FinancialInsights from './FinancialInsights';

const Statements = ({ transactions }) => {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl">
      <h3 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Statements
      </h3>

      <ul className="space-y-6">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="bg-green-50 p-6 rounded-xl shadow-md flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {new Date(transaction.createdAt).toLocaleDateString()} -{' '}
                  {transaction.displayText}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    transaction.transactionType === 'incoming'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.transactionType === 'incoming' ? 'Credit' : 'Debit'}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-xl font-bold ${
                    transaction.transactionType === 'incoming'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  R{transaction.amount.toFixed(2)}
                </p>
                <p
                  className={`text-sm rounded-full px-3 py-1 mt-1 inline-block ${
                    transaction.status === 'Approved'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions available.</p>
        )}
      </ul>

      <div className="mt-12">
        <FinancialInsights transactions={transactions} />
      </div>
    </div>
  );
};

export default Statements;
