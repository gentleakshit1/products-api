import { motion } from 'framer-motion';
import { Mail, Code2, Heart, Award, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-200">
      <Navbar category="All" setCategory={() => {}} categories={[]} />

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20 w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Akshit Sharma
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Exploring AI/ML & Backend Dev | LangChain • RAG • Django • DSA | SIH Winner
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="mailto:gentleakshit@gmail.com" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all font-medium shadow-sm hover:shadow-md">
              <Mail className="w-4 h-4" /> gentleakshit@gmail.com
            </a>
            <a href="https://linkedin.com/in/akshit-sharma31" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all font-medium shadow-sm hover:shadow-md">
              LinkedIn
            </a>
            <a href="https://github.com/gentleakshit1" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all font-medium shadow-sm hover:shadow-md">
              GitHub
            </a>
            <a href="https://leetcode.com/u/AkshitSharma31/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all font-medium shadow-sm hover:shadow-md">
              <Code2 className="w-4 h-4" /> LeetCode
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Experience Section */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Experience</h2>
            </div>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                <h3 className="font-bold text-slate-900 text-lg">AI/ML Engineer Intern</h3>
                <p className="text-blue-600 font-medium text-sm mb-2">Signity Solutions, Mohali | June 2026 - Present</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Built an AI-integrated Resume & JD Evaluation System using LangChain & LangGraph agentic pipelines. Architected a scalable backend with RAG + ChromaDB for vector search and Redis for low-latency caching.
                </p>
              </div>
              
              <div className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                <h3 className="font-bold text-slate-900 text-lg">Gentleman Cadet</h3>
                <p className="text-slate-500 font-medium text-sm mb-2">Indian Army, Gaya | Feb 2023 - Nov 2024</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Led teams under high-pressure environments. Cleared Services Selection Board (top 1% acceptance), demonstrating exceptional leadership aptitude and resilience.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Projects & Achievements */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Achievements Section */}
            <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
                  <Trophy className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Achievements</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Smart India Hackathon Winner:</span>
                    <p className="text-sm text-slate-600 mt-1">Won 1st place in the SIH 2025 internal round. Built SIMS, a Smart Inventory System for tracking railway parts using laser-marked QR codes.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Code2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">500+ DSA Questions:</span>
                    <p className="text-sm text-slate-600 mt-1">Strong problem-solving across LeetCode covering dynamic programming, graphs, and system design.</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Education Section */}
            <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Education</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900">B.Tech in Computer Science (AI & ML)</h3>
                  <p className="text-emerald-600 font-medium text-sm">Amity University | 2024 - 2028</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Sainik School Kapurthala</h3>
                  <p className="text-slate-500 font-medium text-sm">Class XII (CBSE) | 2015 - 2022</p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>

      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center text-slate-500 text-sm font-medium gap-2">
          Developed with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by Akshit Sharma
        </div>
      </footer>
    </div>
  );
}
