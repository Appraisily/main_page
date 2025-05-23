import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { fetchAppraisals } from '@/lib/api/dashboardApi';
import { useAuth } from '@/lib/auth/AuthContext';
import type { AppraisalPost } from '@/lib/types/dashboard';
import type { DashboardFilters } from '@/lib/types/dashboard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AppraisalCard from '@/components/dashboard/AppraisalCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, authenticated, loading: authLoading } = useAuth();
  const loadingRef = React.useRef(false);
  
  const [appraisals, setAppraisals] = useState<AppraisalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>({
    status: 'publish',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const loadAppraisals = async () => {
      // Skip loading if no authenticated user
      if (!user?.email) {
        console.log('[Dashboard] No user email available, skipping load');
        return;
      }

      // Prevent duplicate loads
      if (loadingRef.current) {
        console.log('[Dashboard] Load already in progress, skipping');
        return;
      }
      loadingRef.current = true;

      console.log('[Dashboard] Loading appraisals for:', {
        email: user.email,
        filters
      });

      try {
        setLoading(true);
        const data = await fetchAppraisals(user.email, filters);
        console.log('[Dashboard] Appraisals loaded:', {
          count: data.length,
          firstAppraisal: data[0] ? {
            id: data[0].id,
            title: data[0].title,
            imageFields: {
              main: data[0].acf.main,
              main_url: data[0].acf.main_url
            },
            link: data[0].link
          } : null
        });
        setAppraisals(data);
        setError(null);
      } catch (err) {
        setError('Failed to load appraisals');
        console.error('[Dashboard] Error loading appraisals:', err);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadAppraisals();
    
    return () => {
      // Reset loading state on cleanup
      loadingRef.current = false;
    };
  }, [user?.email, filters]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 sm:pt-24 pb-12">
        <div className="container px-4 sm:px-6">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  // Require authentication for dashboard access
  if (!authenticated || !user) {
    return (
      <div className="min-h-screen bg-background pt-16 sm:pt-24 pb-12">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center space-y-4">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              Please sign in to view your appraisals.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-ring-gray-400 bg-gray-900 text-gray-50 hover:bg-gray-800 h-10 px-4 py-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
        {/* Header */}
        <div className="max-w-screen-lg mx-auto">
          <DashboardHeader 
            email={user.email} 
            totalAppraisals={appraisals.length} 
          />
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4">
              <p className="text-destructive">{error}</p>
            </div>
          ) : appraisals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4 bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-screen-lg mx-auto">
              <p className="text-muted-foreground text-center">No appraisals found.</p>
              <p className="text-sm text-gray-500 text-center">Your completed appraisals will appear here.</p>
            </div>
          ) : (
            <div className="max-w-screen-lg mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {appraisals.map((appraisal) => (
                  <div key={appraisal.id} className="flex h-full">
                    <AppraisalCard appraisal={appraisal} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}