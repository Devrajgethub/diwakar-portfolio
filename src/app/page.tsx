'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Shield, ChevronDown, Download, ExternalLink, Github, Linkedin,
  Instagram, Mail, MapPin, Code, Network, Server, Globe, Lock,
  Bug, Search, Zap, Terminal, ArrowRight, Send, CheckCircle,
  Eye, FileCode, Folder, Presentation, Brain,
  Wifi, Monitor, Database, Cpu, Award, FileCheck, Phone, Sword,
  Inbox, MessageSquare, Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import Navbar from '@/components/navbar'
import TypingAnimation from '@/components/typing-animation'
import SectionHeading from '@/components/section-heading'
import { toast } from 'sonner'

// ─── Skills Data ─────────────────────────────────────
const skills = [
  { name: 'Networking', icon: Network, level: 70, color: 'from-green-500 to-emerald-400' },
  { name: 'Linux', icon: Server, level: 65, color: 'from-orange-500 to-yellow-400' },
  { name: 'Python', icon: Code, level: 60, color: 'from-blue-500 to-cyan-400' },
  { name: 'HTML', icon: Globe, level: 80, color: 'from-red-500 to-orange-400' },
  { name: 'CSS', icon: Monitor, level: 75, color: 'from-purple-500 to-pink-400' },
  { name: 'JavaScript', icon: Zap, level: 65, color: 'from-yellow-500 to-amber-400' },
  { name: 'Nmap', icon: Search, level: 60, color: 'from-cyan-500 to-teal-400' },
  { name: 'Wireshark', icon: Eye, level: 55, color: 'from-indigo-500 to-blue-400' },
  { name: 'Burp Suite', icon: Bug, level: 50, color: 'from-orange-600 to-red-400' },
  { name: 'Web Security', icon: Lock, level: 55, color: 'from-green-400 to-cyan-400' },
]

// ─── Projects Data ───────────────────────────────────
const projects = [
  {
    name: 'Rain Detection System',
    description: 'IoT-based rain detection system using sensors and microcontrollers for automated weather monitoring.',
    tech: ['Arduino', 'C++', 'Sensors'],
    icon: Wifi,
    category: 'iot',
    thumbnail: '/projects/rain-detection-system.png',
    downloadUrl: '/projects/rain-detection-system.pptx',
  },
  {
    name: 'Ethical Hacking Presentation',
    description: 'Comprehensive presentation covering ethical hacking fundamentals, methodologies, and real-world case studies.',
    tech: ['PowerPoint', 'Research', 'Cyber Security'],
    icon: Presentation,
    category: 'security',
    thumbnail: '/projects/ethical-hacking.png',
    downloadUrl: '/projects/ethical-hacking.pptx',
  },
  {
    name: 'Blood Donation Management System',
    description: 'Team project for managing blood donor records, requests, and facilitating blood donation coordination.',
    tech: ['PowerPoint', 'Research', 'Management'],
    icon: Database,
    category: 'web',
    thumbnail: '/projects/blood-donation.png',
    downloadUrl: '/projects/blood-donation.pptx',
  },
  {
    name: 'Portfolio Website',
    description: 'Personal cybersecurity portfolio built with modern web technologies showcasing skills and projects.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    icon: Folder,
    category: 'web',
    thumbnail: '',
    downloadUrl: '',
  },
]

// ─── Blog Data ───────────────────────────────────────
const blogs = [
  {
    title: 'What is Nmap?',
    excerpt: 'Nmap is an open-source network scanning tool used for network discovery and security auditing. Learn the basics of Nmap, its features, and how to use it effectively...',
    category: 'Tools',
    readTime: '5 min',
    icon: Search,
  },
  {
    title: 'What is SQL Injection?',
    excerpt: 'SQL Injection is a web security vulnerability where an attacker injects malicious SQL queries. Learn how it works, its types, and how to protect against it...',
    category: 'Web Security',
    readTime: '7 min',
    icon: Bug,
  },
  {
    title: 'How to Protect Yourself from Phishing?',
    excerpt: 'Phishing is a cyber attack where an attacker steals your personal information using fake emails or websites. Learn essential tips to stay protected...',
    category: 'Security',
    readTime: '4 min',
    icon: Shield,
  },
  {
    title: 'Getting Started with Wireshark',
    excerpt: 'Wireshark is a powerful network protocol analyzer. Learn how to capture and analyze network traffic to detect suspicious activity and troubleshoot issues...',
    category: 'Tools',
    readTime: '6 min',
    icon: Eye,
  },
  {
    title: 'The Importance of Strong Passwords',
    excerpt: 'Weak passwords can make your account vulnerable to hacking. Learn why strong passwords matter and how to create secure, unbreakable passwords...',
    category: 'Security',
    readTime: '3 min',
    icon: Lock,
  },
]

// ─── Certificates Data ───────────────────────────────
const certificates = [
  {
    title: 'Self Paced Cyber Security Course',
    organization: 'DevTown',
    date: '18 March 2025',
    description: 'Completed comprehensive cyber security training covering network security, ethical hacking, and security tools.',
    thumbnail: '/certificates/devtown-cyber-security.png',
    pdfUrl: '/certificates/devtown-cyber-security.pdf',
    verifiedUrl: 'https://cert.devtown.in/verify/1j3rKPjy',
  },
  {
    title: 'DCSC - Web Application Penetration Testing',
    organization: 'TDO Tech Education Pvt. Ltd.',
    date: '03 March 2025',
    description: 'Certified in Drop Certified Security Course for Web Application Penetration Testing. ISO 9001:2015 certified.',
    thumbnail: '/certificates/tdo-dcsc-penetration-testing.png',
    pdfUrl: '/certificates/tdo-dcsc-penetration-testing.pdf',
    verifiedUrl: '',
  },
  {
    title: 'Project Completion - Cyber Security Program',
    organization: 'DevTown',
    date: '18 March 2025',
    description: 'Successfully completed a hands-on project in the Self Paced Cyber Security Program under DevTown mentorship.',
    thumbnail: '/certificates/devtown-project-completion.png',
    pdfUrl: '/certificates/devtown-project-completion.pdf',
    verifiedUrl: 'https://cert.devtown.in/verify/uYradShv',
  },
  {
    title: 'DCSC - Web Application Penetration Testing (Level 2)',
    organization: 'TDO Tech Education Pvt. Ltd.',
    date: '09 July 2025',
    description: 'Advanced DCSC certification for Web Application Penetration Testing. ISO 9001:2015 certified. Valid until July 2027.',
    thumbnail: '/certificates/tdo-dcsc-webapp-pentest2.png',
    pdfUrl: '/certificates/tdo-dcsc-webapp-pentest2.pdf',
    verifiedUrl: '',
  },
  {
    title: 'Ethical Hacking with AI - Training Certificate',
    organization: 'Internshala Trainings & IITM Pravartak',
    date: '08 January 2026',
    description: '8-week online training on Ethical Hacking with AI covering VAPT, OWASP Top 10, automating VAPT, and reporting. Top performer.',
    thumbnail: '/certificates/internshala-ethical-hacking-ai.png',
    pdfUrl: '/certificates/internshala-ethical-hacking-ai.pdf',
    verifiedUrl: 'https://trainings.internshala.com/verify_certificate',
  },
  {
    title: 'NSDC - Ethical Hacking with AI',
    organization: 'Scholiverse Educare Pvt. Ltd. (NSDC/Skill India)',
    date: '08 January 2026',
    description: 'Certified in Ethical Hacking with AI under Skill India & NSDC initiative. Achieved Grade A. Student ID: CAN_38904578.',
    thumbnail: '/certificates/nsdc-ethical-hacking-ai.png',
    pdfUrl: '/certificates/nsdc-ethical-hacking-ai.pdf',
    verifiedUrl: '',
  },
]

// ─── Animation Variants ──────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// ─── Animated Section Wrapper ────────────────────────
function AnimatedSection({ children, id, className = '' }: { children: React.ReactNode; id: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}

// ─── Main Page Component ─────────────────────────────
// ─── Admin Messages Panel Component ──────────────────
function AdminMessagesPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState<Array<{
    id: string; name: string; email: string; message: string; read: boolean; createdAt: string
  }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_PASSWORD = 'diwakar4cs'

  const fetchMessages = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      if (data.messages) {
        setMessages(data.messages)
      }
    } catch {
      toast.error('Failed to load messages')
    }
    setIsLoading(false)
  }, [])

  const handleOpenPanel = useCallback((open: boolean) => {
    setIsOpen(open)
    if (open && isAuthenticated) {
      fetchMessages()
    }
  }, [isAuthenticated, fetchMessages])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
      fetchMessages()
    } else {
      toast.error('Wrong password!')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
      setMessages(prev => prev.filter(m => m.id !== id))
      toast.success('Message deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <>
      {/* Floating Admin Button */}
      <button
        onClick={() => handleOpenPanel(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-lg hover:border-cyber-green/50 hover:shadow-cyber-green/10 transition-all group"
        title="Admin - View Messages"
      >
        <Inbox className="h-5 w-5 text-muted-foreground group-hover:text-cyber-green transition-colors" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-cyber-green text-[10px] font-bold text-black flex items-center justify-center">
            {messages.length}
          </span>
        )}
      </button>

      {/* Messages Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => handleOpenPanel(false)}>
          <div className="w-full max-w-lg max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {!isAuthenticated ? (
              /* Login Form */
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-cyber-green/10">
                    <Lock className="h-5 w-5 text-cyber-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Admin Access</h3>
                    <p className="text-sm text-muted-foreground">Enter password to view messages</p>
                  </div>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="font-mono"
                  />
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20 border border-cyber-green/30" variant="outline">
                      Unlock
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => handleOpenPanel(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              /* Messages List */
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-cyber-green" />
                    <h3 className="font-semibold text-foreground">Messages ({messages.length})</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={fetchMessages}>
                      Refresh
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setIsAuthenticated(false); handleOpenPanel(false) }}>
                      Logout
                    </Button>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[60vh] p-4 space-y-3">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="h-6 w-6 border-2 border-cyber-green border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-8">
                      <Inbox className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No messages yet</p>
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className="p-4 rounded-lg bg-background/50 border border-border hover:border-cyber-green/20 transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-foreground">{msg.name}</span>
                              <span className="text-xs text-muted-foreground font-mono">{msg.email}</span>
                            </div>
                            <p className="text-sm text-muted-foreground break-words">{msg.message}</p>
                            <p className="text-xs text-muted-foreground mt-2 font-mono">
                              {new Date(msg.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(msg.id)}
                            className="text-muted-foreground hover:text-red-400 shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const [projectFilter, setProjectFilter] = useState('all')
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme } = useTheme()

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!contactForm.name.trim()) {
      toast.error('Name is required!')
      return
    }
    if (!contactForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      toast.error('Valid email is required!')
      return
    }
    if (!contactForm.message.trim() || contactForm.message.trim().length < 10) {
      toast.error('Message must be at least 10 characters!')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      if (res.ok) {
        toast.success('Message sent successfully! 🎉')
        setContactForm({ name: '', email: '', message: '' })
      } else {
        toast.error('Failed to send message. Try again!')
      }
    } catch {
      toast.error('Network error. Please try again!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed inset-0 scanline pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* ═══════ HERO SECTION ═══════ */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src="/cyber-hero.png"
              alt=""
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          </div>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-green/5 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-cyan/5 blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-green/30 bg-cyber-green/5 text-cyber-green text-sm font-mono mb-8">
                <div className="w-2 h-2 rounded-full bg-cyber-green pulse-dot" />
                <span>System Online — Ready to Connect</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="text-foreground">Hi, I&apos;m </span>
              <span className="text-cyber-green glow-green">Diwakar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 font-mono h-10"
            >
              <span className="text-cyber-cyan">&gt; </span>
              <TypingAnimation
                texts={[
                  'Aspiring Red Teamer',
                  'Cyber Security Student',
                  'Web Security Learner',
                  'Ethical Hacking Enthusiast',
                ]}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10"
            >
              Passionate about Cyber Security, Red Teaming, Networking, and Ethical Hacking.
              On a mission to become a skilled Red Teamer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-cyber-green text-black hover:bg-cyber-green/90 font-semibold px-8 btn-glow"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Shield className="mr-2 h-5 w-5" />
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 font-semibold px-8"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="h-6 w-6 text-cyber-green" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ ABOUT SECTION ═══════ */}
        <AnimatedSection id="about">
          <SectionHeading title="About Me" subtitle="Know who I am and what drives me" />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Avatar / Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-gradient-to-br from-cyber-green/20 to-cyber-cyan/20 border border-cyber-green/30 flex items-center justify-center overflow-hidden glow-border-green">
                  <img
                    src="/profile.png"
                    alt="Diwakar - Cyber Security Student"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-cyber-green font-mono text-sm">&gt; diwakar@cybersec:~$</p>
                    <p className="text-muted-foreground text-xs">Student | Hacker | Learner</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyber-green" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyber-cyan" />
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="font-mono text-sm text-cyber-green mb-4">
                  <span className="text-muted-foreground">$</span> cat about.txt
                </div>

                <p className="text-foreground leading-relaxed">
                  My name is <span className="text-cyber-green font-semibold">Diwakar</span>. I am a student of{' '}
                  <span className="text-cyber-cyan font-semibold">Diploma in Computer Science and Technology</span>.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  I have a strong interest in Cyber Security, Red Teaming, Networking, and Ethical Hacking.
                  My goal is to become a skilled{' '}
                  <span className="text-cyber-green font-semibold">Red Teamer</span> in the future.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Currently, I am learning penetration testing, network security, and web application security.
                  I believe in continuous learning and building practical skills.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Badge variant="outline" className="border-cyber-green/50 text-cyber-green">
                    <Terminal className="mr-1 h-3 w-3" /> Red Teaming
                  </Badge>
                  <Badge variant="outline" className="border-cyber-cyan/50 text-cyber-cyan">
                    <Shield className="mr-1 h-3 w-3" /> Cyber Security
                  </Badge>
                  <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                    <Network className="mr-1 h-3 w-3" /> Networking
                  </Badge>
                  <Badge variant="outline" className="border-orange-400/50 text-orange-400">
                    <Bug className="mr-1 h-3 w-3" /> Ethical Hacking
                  </Badge>
                </div>

                <div className="pt-6 flex flex-wrap gap-3">
                  <a href="/downloads/resume.png" download="Diwakar_Resume.png">
                    <Button
                      className="bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20 border border-cyber-green/30 btn-glow"
                      variant="outline"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  </a>
                  <a href="/downloads/resume.png" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20 border border-cyber-cyan/30"
                      variant="outline"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Resume
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <Separator className="max-w-7xl mx-auto bg-border/50" />

        {/* ═══════ SKILLS SECTION ═══════ */}
        <AnimatedSection id="skills">
          <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <motion.div key={skill.name} variants={itemVariants}>
                  <Card className="cyber-card bg-card/50 backdrop-blur-sm border-border hover:border-cyber-green/50 group cursor-pointer">
                    <CardContent className="p-5 text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-cyber-green/10 to-cyber-cyan/10 group-hover:from-cyber-green/20 group-hover:to-cyber-cyan/20 transition-all">
                          <Icon className="h-7 w-7 text-cyber-green group-hover:drop-shadow-[0_0_6px_rgba(0,255,65,0.5)] transition-all" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">{skill.name}</h3>
                      <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-1.5 rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 inline-block">{skill.level}%</span>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatedSection>

        <Separator className="max-w-7xl mx-auto bg-border/50" />

        {/* ═══════ PROJECTS SECTION ═══════ */}
        <AnimatedSection id="projects">
          <SectionHeading title="Projects" subtitle="Things I have built and worked on" />

          {/* Project Filter */}
          <div className="flex justify-center mb-8">
            <Tabs value={projectFilter} onValueChange={setProjectFilter}>
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="all" className="data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                  All
                </TabsTrigger>
                <TabsTrigger value="web" className="data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                  Web Dev
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                  Security
                </TabsTrigger>
                <TabsTrigger value="iot" className="data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                  IoT
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => {
              const Icon = project.icon
              return (
                <motion.div key={project.name} variants={itemVariants}>
                  <Card className="cyber-card bg-card/50 backdrop-blur-sm border-border hover:border-cyber-green/50 group h-full flex flex-col overflow-hidden">
                    {/* Project Thumbnail */}
                    {project.thumbnail ? (
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                          src={project.thumbnail}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gradient-to-br from-cyber-green/10 to-cyber-cyan/10 flex items-center justify-center">
                        <Icon className="h-12 w-12 text-cyber-green/30" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-cyber-green/10 group-hover:bg-cyber-green/20 transition-all">
                          <Icon className="h-5 w-5 text-cyber-green" />
                        </div>
                        <Badge variant="outline" className="border-cyber-cyan/30 text-cyber-cyan text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-base text-foreground mt-2 group-hover:text-cyber-green transition-colors leading-tight">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pt-0">
                      <CardDescription className="text-muted-foreground text-sm mb-3 flex-1">
                        {project.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      {project.downloadUrl ? (
                        <a href={project.downloadUrl} download className="w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 group-hover:border-cyber-green/60 transition-all"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PPT
                          </Button>
                        </a>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 group-hover:border-cyber-green/60 transition-all"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Project
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatedSection>

        <Separator className="max-w-7xl mx-auto bg-border/50" />

        {/* ═══════ BLOG SECTION ═══════ */}
        <AnimatedSection id="blog">
          <SectionHeading title="Blog" subtitle="Cyber security articles and tutorials" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => {
              const Icon = blog.icon
              return (
                <motion.div key={blog.title} variants={itemVariants}>
                  <Card className="cyber-card bg-card/50 backdrop-blur-sm border-border hover:border-cyber-cyan/50 group h-full flex flex-col cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-cyber-cyan/10 group-hover:bg-cyber-cyan/20 transition-all">
                          <Icon className="h-5 w-5 text-cyber-cyan" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-cyber-cyan/30 text-cyber-cyan text-xs">
                            {blog.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base text-foreground group-hover:text-cyber-cyan transition-colors">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                        {blog.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-cyber-cyan text-sm font-medium group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatedSection>

        <Separator className="max-w-7xl mx-auto bg-border/50" />

        {/* ═══════ CERTIFICATES SECTION ═══════ */}
        <AnimatedSection id="certificates">
          <SectionHeading title="Certificates" subtitle="My professional certifications and achievements" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((cert) => (
              <motion.div key={cert.title} variants={itemVariants}>
                <Card className="cyber-card bg-card/50 backdrop-blur-sm border-border hover:border-cyber-green/50 group h-full flex flex-col overflow-hidden">
                  {/* Certificate Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={cert.thumbnail}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 text-xs">
                        <Award className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-foreground group-hover:text-cyber-green transition-colors leading-tight">
                      {cert.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-cyber-cyan font-medium">{cert.organization}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col pt-0">
                    <p className="text-muted-foreground text-sm flex-1 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    <div className="flex gap-2">
                      <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10 transition-all"
                        >
                          <FileCheck className="mr-2 h-4 w-4" />
                          View PDF
                        </Button>
                      </a>
                      <a href={cert.pdfUrl} download className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        <Separator className="max-w-7xl mx-auto bg-border/50" />

        {/* ═══════ CONTACT SECTION ═══════ */}
        <AnimatedSection id="contact">
          <SectionHeading title="Contact Me" subtitle="Get in touch for collaboration or just to say hi!" />

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Send className="h-5 w-5 text-cyber-green" />
                    Send a Message
                  </CardTitle>
                  <CardDescription>Fill out the form and I&apos;ll get back to you soon.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="bg-background border-border focus:border-cyber-green focus:ring-cyber-green/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="bg-background border-border focus:border-cyber-green focus:ring-cyber-green/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder="Your message... (minimum 10 characters)"
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="bg-background border-border focus:border-cyber-green focus:ring-cyber-green/20 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyber-green text-black hover:bg-cyber-green/90 font-semibold btn-glow"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="mr-2"
                        >
                          <Zap className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-cyber-cyan" />
                    Connect With Me
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="mailto:diwakar4cs@gmail.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyber-green/5 transition-all group">
                    <div className="p-2 rounded-lg bg-cyber-green/10 group-hover:bg-cyber-green/20 transition-all">
                      <Mail className="h-5 w-5 text-cyber-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">diwakar4cs@gmail.com</p>
                    </div>
                  </a>

                  <a href="tel:+918962022501" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyber-green/5 transition-all group">
                    <div className="p-2 rounded-lg bg-cyber-green/10 group-hover:bg-cyber-green/20 transition-all">
                      <Phone className="h-5 w-5 text-cyber-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">+91 8962022501</p>
                    </div>
                  </a>

                  <a href="https://github.com/Devrajgethub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyber-green/5 transition-all group">
                    <div className="p-2 rounded-lg bg-cyber-green/10 group-hover:bg-cyber-green/20 transition-all">
                      <Github className="h-5 w-5 text-cyber-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">GitHub</p>
                      <p className="text-sm text-muted-foreground">Devrajgethub</p>
                    </div>
                  </a>

                  <a href="https://www.instagram.com/devraj_den/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-500/5 transition-all group">
                    <div className="p-2 rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 transition-all">
                      <Instagram className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Instagram</p>
                      <p className="text-sm text-muted-foreground">@devraj_den</p>
                    </div>
                  </a>

                  <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/5 transition-all group">
                    <div className="p-2 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-all">
                      <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Discord</p>
                      <p className="text-sm text-muted-foreground">devraj_den</p>
                    </div>
                  </a>

                  <a href="https://tryhackme.com/p/devraj.den" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/5 transition-all group">
                    <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-all">
                      <Sword className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">TryHackMe</p>
                      <p className="text-sm text-muted-foreground">devraj.den</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <MapPin className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Asansol, West Bengal, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terminal-style info */}
              <Card className="bg-card/50 backdrop-blur-sm border-border font-mono text-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-muted-foreground text-xs ml-2">terminal</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p><span className="text-cyber-green">diwakar@cybersec</span>:<span className="text-cyber-cyan">~</span>$ whoami</p>
                    <p className="text-muted-foreground">Diwakar — Cyber Security Student</p>
                    <p><span className="text-cyber-green">diwakar@cybersec</span>:<span className="text-cyber-cyan">~</span>$ cat goals.txt</p>
                    <p className="text-muted-foreground">→ Become a skilled Red Teamer</p>
                    <p className="text-muted-foreground">→ Master Penetration Testing</p>
                    <p className="text-muted-foreground">→ Build Secure Systems</p>
                    <p><span className="text-cyber-green">diwakar@cybersec</span>:<span className="text-cyber-cyan">~</span>$ <span className="typing-cursor">echo &quot;Let&apos;s connect!&quot;</span></p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      {/* ═══════ ADMIN MESSAGES PANEL ═══════ */}
      <AdminMessagesPanel />

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyber-green" />
              <span className="text-sm font-mono">
                <span className="text-cyber-green">Diwakar</span>
                <span className="text-muted-foreground"> | </span>
                <span className="text-cyber-cyan">CyberSec Portfolio</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Devrajgethub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyber-green transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/devraj_den/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
              </a>
              <a href="https://tryhackme.com/p/devraj.den" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-400 transition-colors">
                <Sword className="h-5 w-5" />
              </a>
              <a href="mailto:diwakar4cs@gmail.com" className="text-muted-foreground hover:text-cyber-green transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              &copy; {new Date().getFullYear()} Diwakar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
