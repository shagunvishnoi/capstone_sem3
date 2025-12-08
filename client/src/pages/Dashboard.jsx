import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from '../context/LoaderContext';
import Button from '../components/Button';
import {
    Plus,
    Search,
    Filter,
    Calendar,
    Clock,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Dumbbell,
    Edit2,
    Eye
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { showLoader, hideLoader } = useLoader();
    const [workouts, setWorkouts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('-date');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchWorkouts = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/workouts?page=${page}&limit=6&search=${search}&sort=${sort}`);
            setWorkouts(res.data.workouts);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, [page, search, sort]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            showLoader('Deleting workout...');
            try {
                await api.delete(`/workouts/${id}`);
                await fetchWorkouts();
            } catch (err) {
                console.error(err);
            } finally {
                hideLoader();
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                        My Workouts
                    </h2>
                    <p className="text-text-muted">Track your progress and manage your training sessions.</p>
                </div>
                <Button icon={Plus} className="shadow-lg shadow-primary/20" onClick={() => navigate('/workouts/new')}>
                    Add Workout
                </Button>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search workouts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-11 bg-surface-highlight/50 border-transparent focus:bg-surface-highlight"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-text-muted hidden md:block" />
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-surface-highlight/50 border-transparent focus:bg-surface-highlight w-full md:w-56"
                    >
                        <option value="-date">Newest First</option>
                        <option value="date">Oldest First</option>
                        <option value="duration">Duration (Shortest)</option>
                        <option value="-duration">Duration (Longest)</option>
                    </select>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {loading && workouts.length === 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="glass-card h-48 animate-pulse bg-surface-highlight/20" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {workouts.map((workout, index) => (
                                <motion.div
                                    key={workout._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card group hover:border-primary/50 flex flex-col h-full"
                                >
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <Dumbbell className="w-6 h-6" />
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                <button
                                                    onClick={() => handleDelete(workout._id)}
                                                    className="p-1.5 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 line-clamp-1" title={workout.title}>
                                            {workout.title}
                                        </h3>

                                        <div className="flex flex-col gap-2 text-sm text-text-muted">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(workout.date).toLocaleDateString(undefined, {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-secondary font-medium">{workout.duration} mins</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border-t border-glass-border bg-surface-highlight/20 flex gap-3">
                                        <Link to={`/workouts/${workout._id}`} className="flex-1">
                                            <Button variant="secondary" size="sm" className="w-full text-xs">
                                                <Eye className="w-3.5 h-3.5 mr-2" /> View
                                            </Button>
                                        </Link>
                                        <Link to={`/workouts/edit/${workout._id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full text-xs border-glass-border hover:border-primary/50">
                                                <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && workouts.length === 0 && (
                    <motion.div
                        className="text-center py-20 glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-20 h-20 bg-surface-highlight rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            💪
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No workouts found</h3>
                        <p className="text-text-muted mb-8 max-w-sm mx-auto">
                            It looks like you haven't tracked any workouts yet. Start your journey today!
                        </p>
                        <Button size="lg" icon={Plus} onClick={() => navigate('/workouts/new')}>
                            Create First Workout
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-10 flex justify-center gap-4 items-center">
                    <Button
                        variant="ghost"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="disabled:opacity-30"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" /> Prev
                    </Button>
                    <span className="text-sm font-medium px-4 py-2 bg-surface-highlight rounded-lg">
                        {page} <span className="text-text-muted">/</span> {totalPages}
                    </span>
                    <Button
                        variant="ghost"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="disabled:opacity-30"
                    >
                        Next <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
