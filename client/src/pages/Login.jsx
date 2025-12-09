import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { Mail, Lock, AlertCircle, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4">
            <motion.div
                className="glass-card p-8 md:p-10 w-full max-w-md relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="mb-6 relative z-10">
                    <Link to="/" className="inline-flex items-center text-text-muted hover:text-primary transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">Welcome Back</h2>
                    <p className="text-text-muted">Sign in to continue your progress</p>
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

                <form onSubmit={onSubmit} className="space-y-5 relative z-10">
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
                        className="w-full text-lg shadow-lg shadow-primary/25 mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Signing in...</>
                        ) : (
                            <>Sign In <ArrowRight className="w-5 h-5 ml-2" /></>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-text-muted relative z-10">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-primary-dark font-medium transition-colors hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
