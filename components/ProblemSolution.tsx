// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, AlertCircle, Globe, Ban, ArrowRight, Wallet, PieChart, ShieldCheck, BarChart3 } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="mission" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dodger-blue-100 text-dodger-blue-700 text-xs font-semibold tracking-wide uppercase mb-6">
              <AlertCircle size={14} />
              <span>The Challenge</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              The Financial System <br />
              <span className="text-dodger-blue-600">Wasn't Built For You.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed font-normal max-w-xl"
          >
            Despite the surge in smartphone adoption, 98.7% of Latin Americans with savings do not invest. Inflation erodes wealth while traditional banks offer negligible returns.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Main Stat Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-dodger-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-red-50 rounded-lg text-red-600">
                  <Ban size={20} />
                </div>
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">The Investment Gap</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div>
                  <h3 className="text-7xl md:text-8xl font-bold text-slate-900 mb-4 tracking-tighter">98.7%</h3>
                  <p className="text-lg text-slate-600 font-medium leading-snug">Of Latin American adults with savings <span className="text-red-600 font-semibold">do not invest</span>.</p>
                </div>
                <div className="hidden md:block">
                  <div className="h-32 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-end justify-between p-4 px-6 gap-2">
                    {[40, 65, 45, 80, 55, 90, 30, 50].map((h, i) => (
                      <div key={i} className="w-full bg-dodger-blue-100 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Stats Column */}
          <div className="flex flex-col gap-8">

            {/* Capital Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 p-8 rounded-2xl bg-dodger-blue-600 text-white shadow-lg shadow-dodger-blue-900/10 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-16 bg-white/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <div className="mb-4 p-2 bg-white/20 w-fit rounded-lg backdrop-blur-sm">
                  <Wallet size={20} className="text-white" />
                </div>
                <h4 className="text-4xl font-bold text-white mb-1 tracking-tight">$150B</h4>
                <p className="text-dodger-blue-100 text-sm font-medium">Untapped investable capital annually.</p>
              </div>
            </motion.div>

            {/* Participation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-center"
            >
              <div className="mb-4 p-2 bg-slate-100 w-fit rounded-lg text-slate-700">
                <PieChart size={20} />
              </div>
              <h4 className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">3%</h4>
              <p className="text-slate-500 text-sm font-medium">Current retail investment participation.</p>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: TrendingDown, title: "Inflation Protection", desc: "Local currencies lose value daily. Holding cash is actively losing wealth.", color: "text-dodger-blue-600", bg: "bg-dodger-blue-50" },
            { icon: Globe, title: "Global Access", desc: "Access US markets without the complexity of traditional international accounts.", color: "text-dodger-blue-600", bg: "bg-dodger-blue-50" },
            { icon: ShieldCheck, title: "Secure & Simple", desc: "Bank-grade security with an interface designed for everyone, not just traders.", color: "text-dodger-blue-600", bg: "bg-dodger-blue-50" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              className="group p-6 rounded-xl bg-white border border-slate-100 hover:border-dodger-blue-100 hover:shadow-lg hover:shadow-dodger-blue-900/5 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={20} />
              </div>
              <h5 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h5>
              <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};