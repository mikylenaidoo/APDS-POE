import React, { useEffect, useState, useCallback } from 'react';
import { DollarSign, FileText } from 'lucide-react';
import PaymentForm from './PaymentForm';
import Statements from './Statements';
import { getBalanceAndTransactions, getUserProfile } from '../api';

const UserHome = ({ token }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const balanceResponse = await getBalanceAndTransactions(token);
      setBalance(balanceResponse.data.balance);
      setTransactions(balanceResponse.data.transactions);

      const profileResponse = await getUserProfile(token);
      setAccountNumber(profileResponse.data.accountNumber);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const tabs = [
    {
      id: 'overview',
      label: 'Account Overview',
      icon: <FileText size={20} />,
    },
    {
      id: 'makePayment',
      label: 'Make a Payment',
      icon: <DollarSign size={20} />,
    },
    {
      id: 'statements',
      label: 'View Statements',
      icon: <FileText size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-700">International Bank</h1>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="text-lg font-medium text-gray-800">{accountNumber}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <nav className="mb-8">
          <ul className="flex space-x-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-4 py-2 border-b-2 ${
                    selectedTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-600'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        {loading ? (
          <div className="text-center text-gray-500">Loading data...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div>
            {selectedTab === 'overview' && (
              <div>
                {/* Account Overview */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <p className="text-sm text-gray-500">Current Balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        R{balance.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <p className="text-sm text-gray-500">Available Balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        R{balance.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="text-lg font-medium text-gray-800">{accountNumber}</p>
                    </div>
                  </div>
                </section>

                {/* Recent Transactions */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Recent Transactions
                  </h2>
                  {transactions.length > 0 ? (
                    <table className="min-w-full bg-white shadow-sm rounded-lg">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.slice(0, 5).map((transaction) => (
                          <tr key={transaction._id} className="border-t">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {transaction.displayText}
                            </td>
                            <td
                              className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                                transaction.transactionType === 'incoming'
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {transaction.transactionType === 'incoming' ? '+' : '-'}R
                              {transaction.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                              {transaction.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500">No recent transactions.</p>
                  )}
                </section>
              </div>
            )}

            {selectedTab === 'makePayment' && (
              <PaymentForm
                token={token}
                onTransactionUpdate={fetchUserData}
                balance={balance}
              />
            )}

            {selectedTab === 'statements' && (
              <Statements transactions={transactions} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserHome;
