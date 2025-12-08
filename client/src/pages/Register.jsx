import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { User, Mail, Lock, AlertCircle, ArrowRight, Loader2, Dumbbell, GraduationCap, Check } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [role, setRole] = useState('client');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(name, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.msg || err.message || 'Registration Failed. Please try again.';
            setError(errorMessage);
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
            <motion.div
                className="glass-card p-8 md:p-10 w-full max-w-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative background blur */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">Join WorkFit</h2>
                    <p className="text-text-muted">Start your journey today</p>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 flex items-start gap-3 backdrop-blur-sm"
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                    <div
                        onClick={() => setRole('client')}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${role === 'client'
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                            : 'border-glass-border bg-surface/30 hover:border-primary/50'
                            }`}
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <Dumbbell className={`w-8 h-8 mb-3 ${role === 'client' ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
                            <h3 className={`font-bold text-lg mb-1 ${role === 'client' ? 'text-primary' : 'text-text'}`}>Trainee</h3>
                            <p className="text-xs text-text-muted leading-tight">I want to find workouts and trainers</p>
                        </div>
                        {role === 'client' && (
                            <div className="absolute top-2 right-2 text-primary">
                                <Check className="w-5 h-5" />
                            </div>
                        )}
                    </div>

                    <div
                        onClick={() => setRole('trainer')}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${role === 'trainer'
                            ? 'border-accent bg-accent/10 shadow-lg shadow-accent/10'
                            : 'border-glass-border bg-surface/30 hover:border-accent/50'
                            }`}
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <GraduationCap className={`w-8 h-8 mb-3 ${role === 'trainer' ? 'text-accent' : 'text-text-muted group-hover:text-accent'}`} />
                            <h3 className={`font-bold text-lg mb-1 ${role === 'trainer' ? 'text-accent' : 'text-text'}`}>Trainer</h3>
                            <p className="text-xs text-text-muted leading-tight">I want to coach and train clients</p>
                        </div>
                        {role === 'trainer' && (
                            <div className="absolute top-2 right-2 text-accent">
                                <Check className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-5 relative z-10">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-text-muted pl-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-3.5 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                                className="pl-11"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-text-muted pl-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="pl-11"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-text-muted pl-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="pl-11"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-lg shadow-lg shadow-primary/25 mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Creating Account...</>
                        ) : (
                            <>Create Account <ArrowRight className="w-5 h-5 ml-2" /></>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-text-muted relative z-10">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-dark font-medium transition-colors hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
