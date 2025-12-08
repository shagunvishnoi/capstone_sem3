import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dumbbell,
    LayoutDashboard,
    FileText,
    Users,
    UserCircle,
    Utensils,
    LogOut,
    Menu,
    X,
    ShieldCheck
} from 'lucide-react';
import logo from '../assets/logo.png';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/templates', label: 'Templates', icon: FileText },
        ...(user?.role === 'client' ? [{ path: '/trainers', label: 'Trainers', icon: Users }] : []),
        { path: '/weightlifting', label: 'Workouts', icon: Dumbbell },
        { path: '/diet', label: 'Diet', icon: Utensils },
        { path: '/profile', label: 'Profile', icon: UserCircle },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-background/80 backdrop-blur-md border-b border-glass-border' : 'py-5 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group z-50 relative">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <motion.img
                            src={logo}
                            alt="WorkFit"
                            className="w-10 h-10 object-contain relative"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                        />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        WorkFit
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 p-1.5 bg-surface/50 backdrop-blur-md border border-glass-border rounded-full shadow-lg">
                    {user && navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link key={link.path} to={link.path}>
                                <div className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium ${isActive ? 'text-white' : 'text-text-muted hover:text-white'
                                    }`}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-lg shadow-primary/25"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="text-right hidden lg:block">
                                <p className="text-xs text-text-muted">Welcome back,</p>
                                <p className="text-sm font-semibold text-text">{user.name}</p>
                            </div>

                            {user.role === 'admin' && (
                                <Link to="/admin">
                                    <Button variant="ghost" size="icon" title="Admin Panel">
                                        <ShieldCheck className="w-5 h-5 text-accent" />
                                    </Button>
                                </Link>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden relative z-50 p-2 text-text"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-glass-border p-4 md:hidden flex flex-col gap-2 shadow-2xl"
                        >
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 p-3 border-b border-glass-border mb-2">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-text-muted capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <div className={`p-3 rounded-xl flex items-center gap-3 ${location.pathname === link.path
                                                ? 'bg-primary/20 text-primary'
                                                : 'text-text-muted hover:bg-surface-highlight'
                                                }`}>
                                                <link.icon className="w-5 h-5" />
                                                {link.label}
                                            </div>
                                        </Link>
                                    ))}
                                    <div className="h-px bg-glass-border my-2" />
                                    <button
                                        onClick={logout}
                                        className="w-full p-3 rounded-xl flex items-center gap-3 text-red-400 hover:bg-red-500/10"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 p-2">
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-center">Login</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="primary" className="w-full justify-center">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
