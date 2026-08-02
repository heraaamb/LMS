import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Library,
  BookOpen,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
  Search,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  QrCode,
  GraduationCap,
} from 'lucide-react';

export const LandingPage = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const handleQuickDemo = (role) => {
    switchRole(role);
    navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  };

  const faqs = [
    {
      q: 'How does role-based access control work in Athena LMS?',
      a: 'Athena LMS provides separate dashboards for Students and Librarians. Students can search books, track active loans, view fines, and request renewals. Librarians get full admin controls for book indexing, issuing/returning loans, approving reservations, managing fines, and viewing analytics reports.',
    },
    {
      q: 'Can Athena LMS integrate with existing University SIS databases?',
      a: 'Yes, Athena LMS features standard REST APIs and Webhook endpoints that seamlessly interface with LDAP, Active Directory, and Student Information Systems (SIS) for single sign-on (SSO) and automated roster syncing.',
    },
    {
      q: 'How are overdue fines calculated and managed?',
      a: 'Fines are automatically calculated on a daily schedule based on configurable departmental grace periods and daily penalty rates. Students can view clear itemized fee breakdowns and pay online or at the circulation desk.',
    },
    {
      q: 'Is real-time inventory tracking supported across multiple library branches?',
      a: 'Absolutely. Books can be cataloged down to exact rack and shelf positions with live copy status tracking (Available, Issued, Reserved, Under Maintenance).',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Academic Library OS • v2.4</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Modern, intelligent library management for university campuses.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Streamline circulation, automate book indexing, manage fines, and empower thousands of students and faculty with lightning-fast catalog discovery.
        </p>

        {/* Demo Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleQuickDemo('student')}
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Launch Student Portal Demo</span>
          </button>

          <button
            onClick={() => handleQuickDemo('admin')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Launch Librarian Admin Demo</span>
          </button>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-dropdown overflow-hidden">
          <div className="bg-slate-900 rounded-xl p-4 text-left font-mono text-xs text-slate-300 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 text-slate-400">athena.university.edu/admin/dashboard</span>
            </div>
            <span className="text-slate-500">Live Production Preview</span>
          </div>

          <div className="p-6 bg-slate-50 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-semibold uppercase">Total Catalog Titles</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">14,820</p>
              <span className="text-[11px] text-emerald-600 font-medium">↑ +140 new this month</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-semibold uppercase">Active Issued Books</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">842</p>
              <span className="text-[11px] text-brand-600 font-medium">96% returned on time</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-semibold uppercase">Enrolled Students</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">3,850</p>
              <span className="text-[11px] text-slate-500 font-medium">Across 12 departments</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-semibold uppercase">Pending Reservations</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">18</p>
              <span className="text-[11px] text-amber-600 font-medium">1-day avg clearance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Engineered for high-volume academic operations
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Built with extreme precision for campus librarians, academic staff, and students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="p-2.5 w-fit rounded-lg bg-brand-50 text-brand-600 mb-4 border border-brand-100">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Instant Cmd+K Search</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Global command palette allows students and librarians to locate books by ISBN, title, or author in under 50 milliseconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="p-2.5 w-fit rounded-lg bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Strict Role Separation</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Complete route protection prevents unauthorized access while providing tailored dashboards for students vs administrators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="p-2.5 w-fit rounded-lg bg-purple-50 text-purple-600 mb-4 border border-purple-100">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Real-Time Analytics</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Track circulation metrics, peak borrowing hours, popular literature categories, and fine collections with interactive charts.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">Simple 3-step circulation lifecycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-100">Search & Reserve</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Students search the digital catalog, view rack locations, or place a hold reservation on unavailable titles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-100">Issue at Desk</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Librarians scan student cards or verify student IDs to issue books with automatically computed due dates.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-100">Return & Audit</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Books are returned with instant copy availability restoration, condition audits, and zero-headache fine clearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Trusted by leading university librarians
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Athena LMS cut our desk circulation bottleneck by 70%. The clean table views, fast barcode search, and instant reservation approval queue make daily library ops effortless."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
                alt="Head Librarian"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Dr. Eleanor Vance</p>
                <p className="text-[11px] text-slate-500">Chief Librarian, University Central Library</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Being able to check due dates on my phone, request renewals, and search algorithms textbooks in seconds is a game changer for students during finals week."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt="Student"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Alexander Wright</p>
                <p className="text-[11px] text-slate-500">Senior CS Student & Guild President</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to test the interactive portal?</h2>
          <p className="text-xs sm:text-sm text-brand-100 mt-3 max-w-xl mx-auto">
            Choose a demo account below to experience full Student or Librarian workflows in real-time.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleQuickDemo('student')}
              className="px-5 py-2.5 bg-white text-brand-900 font-bold text-xs rounded-lg hover:bg-brand-50 transition-colors shadow-xs"
            >
              Sign In as Student
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              Sign In as Librarian
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
