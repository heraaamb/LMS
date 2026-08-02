import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({ title, value, change, changeType = 'positive', period = 'vs last month', icon: Icon, description }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {change && (
          <div
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'bg-emerald-50 text-emerald-700'
                : changeType === 'negative'
                ? 'bg-rose-50 text-rose-700'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {changeType === 'positive' ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : changeType === 'negative' ? (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            ) : null}
            {change}
          </div>
        )}
      </div>
      {(period || description) && (
        <p className="mt-2 text-xs text-slate-500 font-normal">
          {description ? description : <span className="text-slate-400">{period}</span>}
        </p>
      )}
    </div>
  );
};
