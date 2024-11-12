// src/components/AdminDashboard.js

import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Loader, UserPlus } from 'lucide-react';
import { getPendingPayments, approvePayment, rejectPayment } from '../api';
import api from '../api';

const AdminDashboard = ({ token }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [adminForm, setAdminForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    idNumber: '',
  });
  const [addingAdmin, setAddingAdmin] = useState(false);

  // Fetch pending payments from the API
  const fetchPendingPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPendingPayments(token);
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch pending payments:', error);
      setError('Failed to fetch pending payments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPendingPayments();
  }, [fetchPendingPayments]);

  // Approve a payment
  const handleApprove = async (id) => {
    setError(null);
    setMessage(null);
    setProcessing(id);
    try {
      await approvePayment(token, id);
      setMessage('Payment approved successfully.');
      fetchPendingPayments();
    } catch (error) {
      console.error('Failed to approve payment:', error);
      setError(
        error.response?.data.message || 'Failed to approve payment. Please try again.'
      );
    } finally {
      setProcessing(null);
    }
  };

  // Reject a payment
  const handleReject = async (id) => {
    setError(null);
    setMessage(null);
    setProcessing(id);
    try {
      await rejectPayment(token, id);
      setMessage('Payment rejected successfully.');
      fetchPendingPayments();
    } catch (error) {
      console.error('Failed to reject payment:', error);
      setError(
        error.response?.data.message || 'Failed to reject payment. Please try again.'
      );
    } finally {
      setProcessing(null);
    }
  };

  // Handle admin registration form submission
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAddingAdmin(true);
    setError(null);
    setMessage(null);

    try {
      await api.post('/api/admin/add-admin', adminForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('New admin added successfully.');
      setAdminForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        idNumber: '',
      });
    } catch (error) {
      console.error('Failed to add admin:', error);
      setError(error.response?.data.message || 'Failed to add admin. Please try again.');
    } finally {
      setAddingAdmin(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-lime-500 p-8 rounded-t-3xl">
          <h2 className="text-4xl font-extrabold text-white text-center">
            Admin Dashboard
          </h2>
          <p className="text-white text-center mt-2">
            Manage Pending Payments & Add Administrators
          </p>
        </div>

        {/* Notifications */}
        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 text-green-700 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Pending Payments Section */}
        {loading ? (
          <div className="p-10 flex items-center justify-center">
            <Loader className="animate-spin text-green-500 w-10 h-10" />
          </div>
        ) : (
          <section className="p-6 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Pending Payments
            </h3>
            {payments.length === 0 ? (
              <p className="text-gray-500 text-center">No pending payments at the moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-sm rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        SWIFT Code
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <strong>{payment.sender?.name || 'Unknown'}</strong>
                          <br />
                          <span className="text-xs text-gray-500">
                            {payment.sender?.email || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <strong>{payment.recipient?.name || 'Unknown'}</strong>
                          <br />
                          <span className="text-xs text-gray-500">
                            {payment.recipient?.email || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          R{payment.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {payment.swiftCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleApprove(payment._id)}
                              className={`flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ${
                                processing === payment._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              disabled={processing === payment._id}
                            >
                              {processing === payment._id ? (
                                <Loader size={16} className="animate-spin" />
                              ) : (
                                <CheckCircle size={16} />
                              )}
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(payment._id)}
                              className={`flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ${
                                processing === payment._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              disabled={processing === payment._id}
                            >
                              {processing === payment._id ? (
                                <Loader size={16} className="animate-spin" />
                              ) : (
                                <XCircle size={16} />
                              )}
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Add Admin Section */}
        <section className="p-8 bg-green-50 rounded-b-3xl">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Add New Administrator
          </h3>
          <form onSubmit={handleAddAdmin} className="space-y-6 max-w-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={adminForm.name}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, name: e.target.value })
                }
                required
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Surname"
                value={adminForm.surname}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, surname: e.target.value })
                }
                required
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ID Number"
                value={adminForm.idNumber}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, idNumber: e.target.value })
                }
                required
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={adminForm.email}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, email: e.target.value })
                }
                required
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              required
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={addingAdmin}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-lime-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingAdmin ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <UserPlus size={20} />
                  Add Admin
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
