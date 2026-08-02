import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';

export const ActivityLogsPage = () => {
  const { activityLogs } = useLibrary();

  const columns = [
    {
      header: 'Timestamp',
      key: 'timestamp',
      sortable: true,
      render: (i) => <span className="font-mono text-xs text-slate-500">{i.timestamp}</span>,
    },
    {
      header: 'Actor',
      key: 'actor',
      render: (i) => (
        <div>
          <span className="font-semibold text-slate-900 block">{i.actor}</span>
          <span className="text-[10px] text-slate-400 capitalize">{i.actorRole}</span>
        </div>
      ),
    },
    {
      header: 'Action',
      key: 'action',
      render: (i) => <Badge variant="brand">{i.action}</Badge>,
    },
    { header: 'Target Item', key: 'target', sortable: true },
    { header: 'Details', key: 'details' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Activity Logs</h1>
        <p className="text-xs text-slate-500 mt-1">Audit log of all library circulation actions, account modifications, and catalog transactions.</p>
      </div>

      <DataTable
        columns={columns}
        data={activityLogs}
        searchPlaceholder="Search activity logs..."
        searchField="action"
      />
    </div>
  );
};
