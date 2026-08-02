import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Settings, Save, ShieldCheck, Clock, DollarSign } from 'lucide-react';

export const AdminSettingsPage = () => {
  const { showToast } = useLibrary();

  const [fineRate, setFineRate] = useState(0.50);
  const [graceDays, setGraceDays] = useState(3);
  const [maxLoanLimit, setMaxLoanLimit] = useState(5);
  const [autoEmailNotifs, setAutoEmailNotifs] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Library System parameters updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Configuration & Rules</h1>
        <p className="text-xs text-slate-500 mt-1">Configure global loan limits, daily overdue fine penalty rates, and grace periods.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <Settings className="w-4 h-4 text-brand-600" />
            <span>Circulation Policy Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Daily Overdue Fine ($/day)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  step="0.10"
                  value={fineRate}
                  onChange={(e) => setFineRate(parseFloat(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Grace Period (Days)</label>
              <input
                type="number"
                value={graceDays}
                onChange={(e) => setGraceDays(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Books Per Student</label>
              <input
                type="number"
                value={maxLoanLimit}
                onChange={(e) => setMaxLoanLimit(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Automated Cron Jobs</span>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs sm:text-sm">
            <div>
              <span className="font-bold text-slate-800 block">Automated Overdue Email Reminders</span>
              <span className="text-xs text-slate-500">Automatically trigger daily email notifications to students with overdue items.</span>
            </div>
            <input
              type="checkbox"
              checked={autoEmailNotifs}
              onChange={(e) => setAutoEmailNotifs(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
