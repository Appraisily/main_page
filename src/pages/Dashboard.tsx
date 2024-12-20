import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { fetchAppraisals } from '@/lib/api/dashboardApi';
import type { AppraisalPost } from '@/lib/types/dashboard';
import type { DashboardFilters } from '@/lib/types/dashboard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AppraisalCard from '@/components/dashboard/AppraisalCard';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
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
      // Skip loading if no email
      if (!email) {
        return;
      }

      // Prevent duplicate loads
      if (loadingRef.current) return;
      loadingRef.current = true;

      try {
        setLoading(true);
        const data = await fetchAppraisals(email, filters);
        setAppraisals(data);
        setError(null);
      } catch (err) {
        setError('Failed to load appraisals');
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
  }, [email, filters]);

  if (!email) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <h1 className="text-2xl font-bold">Invalid Access</h1>
            <p className="text-muted-foreground">
              Please provide a valid email address to view your appraisals.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container space-y-8">
        {/* Header */}
        <DashboardHeader 
          email={email} 
          totalAppraisals={appraisals.length} 
        />

        {/* Content */}
        <div className="space-y-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-destructive">{error}</p>
            </div>
          ) : appraisals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">No appraisals found.</p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {appraisals.map((appraisal) => (
                <AppraisalCard key={appraisal.id} appraisal={appraisal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}