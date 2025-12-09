import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import { Activity, BarChart2, Target, Smartphone, ChevronRight, CheckCircle2, TrendingUp, Shield, Zap } from 'lucide-react';
import logo from '../assets/logo.png';

const LandingPage = () => {
    const { user } = useContext(AuthContext);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 1000]);

    const features = [
        {
            icon: Activity,
            title: 'Track Your Progress',
            description: 'Monitor your workouts and see your fitness journey unfold with detailed analytics and insights.',
            color: 'text-primary'
        },
        {
            icon: BarChart2,
            title: 'Smart Analytics',
            description: 'Get valuable insights into your training patterns, strength gains, and performance metrics.',
            color: 'text-secondary'
        },
        {
            icon: Target,
            title: 'Set Goals',
            description: 'Create personalized workout plans and achieve your fitness goals with structured training.',
            color: 'text-accent'
        },
        {
            icon: Smartphone,
            title: 'Always Accessible',
            description: 'Access your workout data anywhere, anytime. Your fitness journey in your pocket.',
            color: 'text-green-400'
        }
    ];

    const stats = [
        { number: '10K+', label: 'Active Users' },
        { number: '50K+', label: 'Workouts Tracked' },
        { number: '1M+', label: 'Exercises Logged' },
        { number: '99%', label: 'Satisfaction Rate' }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-text overflow-hidden relative selection:bg-primary selection:text-white">

            {/* Top Left Logo */}
            <div className="absolute top-6 left-6 z-50">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <motion.img
                            src={logo}
                            alt="IgniteFit"
                            className="w-10 h-10 object-contain relative"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                        />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        IgniteFit
                    </span>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-glass-border bg-glass-highlight backdrop-blur-md"
                    >
                        <span className="flex items-center gap-2 text-sm font-medium text-primary-dark">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            IgniteFit is live
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-[0.9]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Unlock Your <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
                            Fears
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        The ultimate platform for athletes to track workouts, analyze performance,
                        and shatter personal records.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {!user ? (
                            <>
                                <Link to="/register">
                                    <Button size="lg" className="min-w-[200px] text-lg shadow-xl shadow-primary/20">
                                        Start Free Trial <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="lg" className="min-w-[200px] text-lg bg-surface/50 backdrop-blur-sm border-glass-border">
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard">
                                <Button size="lg" className="min-w-[200px] text-lg shadow-xl shadow-primary/20">
                                    Go to Dashboard <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        )}
                    </motion.div>
                </div>

                {/* Hero Floating Elements */}
                <motion.div style={{ y }} className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                    {stat.number}
                                </h3>
                                <p className="text-text-muted font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Why Choose <span className="text-primary">IgniteFit?</span>
                        </motion.h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Built with precision for those who demand excellence in their training tools.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="glass-card p-8 group hover:bg-surface-highlight/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-surface-highlight flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-blue-500">
                                    {feature.title}
                                </h3>
                                <p className="text-text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento Grid / Feature detailed section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 glass-card p-10 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">Advanced Analytics</h3>
                                <p className="text-text-muted max-w-md mb-6">Visualize your progress with interactive charts, heatmaps, and trend analysis. Understand your body better than ever before.</p>
                                <Button variant="secondary" className="group bg-blue-100 !text-blue-900 hover:bg-blue-200">Explore Analytics <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button>
                            </div>
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                                <BarChart2 className="w-64 h-64" />
                            </div>
                        </div>
                        <div className="glass-card p-10 flex flex-col justify-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Secure & Private</h3>
                                <p className="text-text-muted">Your data is encrypted end-to-end. We value your privacy above all else.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        <div className="glass-card p-10 flex flex-col justify-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 text-accent">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
                                <p className="text-text-muted">Optimized specifically for speed. Log workouts in seconds, not minutes.</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 glass-card p-10 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">Community Driven</h3>
                                <p className="text-text-muted max-w-md mb-6">Join a community of like-minded individuals. Share templates, get feedback, and grow together.</p>
                                <Button variant="secondary" className="group bg-blue-100 !text-blue-900 hover:bg-blue-200">Join Community <Users className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button>
                            </div>
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                                <Activity className="w-64 h-64" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                                    Ready to Transform?
                                </span>
                            </h2>
                            <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
                                Join thousands of elite athletes who trust IgniteFit for their daily training.
                            </p>
                            {!user && (
                                <Link to="/register">
                                    <Button size="lg" className="min-w-[200px] text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50">
                                        Get Started Now <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-glass-border bg-surface/30">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                IgniteFit
                            </span>
                        </div>
                        <p className="text-text-muted text-sm">
                            &copy; {new Date().getFullYear()} IgniteFit. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Icon import helper
import { Users } from 'lucide-react';

export default LandingPage;
