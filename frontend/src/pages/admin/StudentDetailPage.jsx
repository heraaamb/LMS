import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { ArrowLeft, Mail, Phone, GraduationCap, Calendar, BookmarkCheck, CreditCard } from 'lucide-react';

export const StudentDetailPage = () => {
  const { id } = useParams();
  const { students, issues, fines } = useLibrary();

  const student = students.find((s) => s.id === id) || students[0];
  const studentIssues = issues.filter((i) => i.studentId === student.id || i.studentId === 'std_1084');
  const studentFines = fines.filter((f) => f.studentId === student.id || f.studentId === 'std_1084');

  const issueColumns = [
    { header: 'Book Title', key: 'bookTitle' },
    { header: 'Issue Date', key: 'issueDate' },
    { header: 'Due Date', key: 'dueDate' },
    {
      header: 'Status',
      key: 'status',
      render: (i) => <Badge variant={i.status === 'overdue' ? 'danger' : 'brand'}>{i.status}</Badge>,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link
          to="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Student Roster
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Account Record</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        {/* Profile Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full object-cover border-2 border-slate-200" />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
              <Badge variant="success">Active Roster</Badge>
            </div>
            <p className="text-xs text-slate-500">{student.department} • {student.year}</p>
            <p className="text-xs font-mono text-slate-600">Roll No: {student.studentId}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">Contact Information</span>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{student.phone}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">Circulation Metrics</span>
            <div className="flex justify-between">
              <span className="text-slate-500">Active Loans:</span>
              <span className="font-bold text-slate-900">{studentIssues.filter(i => i.status !== 'returned').length} books</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Outstanding Fine:</span>
              <span className="font-bold text-rose-600">${student.totalFinesAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Issued Books Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Current & Past Issued Books</h3>
          <DataTable columns={issueColumns} data={studentIssues} pageSize={4} />
        </div>
      </div>
    </div>
  );
};
