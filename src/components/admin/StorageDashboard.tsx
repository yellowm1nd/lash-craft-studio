import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HardDrive, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { getStorageStats, getWarningColor, getWarningBgColor, type StorageStats } from '@/lib/storage-limits';

interface StorageDashboardProps {
  compact?: boolean;
}

export const StorageDashboard = ({ compact = false }: StorageDashboardProps) => {
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // Refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStorageStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading storage stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return compact ? (
      <div className="text-sm text-muted-foreground">Lade...</div>
    ) : (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-4">
            <div className="animate-pulse">Lade Speicher-Info...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getIcon = () => {
    switch (stats.warningLevel) {
      case 'safe':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      case 'warning':
      case 'critical':
      case 'blocked':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <HardDrive className="h-5 w-5 text-gray-600" />;
    }
  };

  const getProgressColor = () => {
    if (stats.percentageUsed >= 0.95) return 'bg-red-600';
    if (stats.percentageUsed >= 0.9) return 'bg-red-500';
    if (stats.percentageUsed >= 0.8) return 'bg-orange-500';
    if (stats.percentageUsed >= 0.7) return 'bg-yellow-500';
    if (stats.percentageUsed >= 0.6) return 'bg-blue-500';
    return 'bg-green-500';
  };

  // Compact version for header
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        {getIcon()}
        <span className={getWarningColor(stats.warningLevel)}>
          {stats.totalUsedMB} / {stats.totalLimitMB} MB
        </span>
        <span className="text-muted-foreground">
          ({Math.round(stats.percentageUsed * 100)}%)
        </span>
      </div>
    );
  }

  // Full dashboard version
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Storage Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Speicher-Nutzung</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {stats.totalUsedMB} MB / {stats.totalLimitMB} MB
            </span>
          </div>
          <Progress
            value={stats.percentageUsed * 100}
            className="h-3"
            indicatorClassName={getProgressColor()}
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{Math.round(stats.percentageUsed * 100)}% genutzt</span>
            <span>{stats.remainingMB} MB frei</span>
          </div>
        </div>

        {/* Image Counts */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.galleryCount}</div>
            <div className="text-xs text-muted-foreground">Galerie</div>
            <div className="text-xs text-muted-foreground">(max. 75)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.serviceCount}</div>
            <div className="text-xs text-muted-foreground">Services</div>
            <div className="text-xs text-muted-foreground">(max. 10)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.testimonialCount}</div>
            <div className="text-xs text-muted-foreground">Testimonials</div>
            <div className="text-xs text-muted-foreground">(max. 20)</div>
          </div>
        </div>

        {/* Warning Message */}
        {stats.warningMessage && (
          <div className={`flex items-start gap-3 p-3 rounded-lg border ${getWarningBgColor(stats.warningLevel)}`}>
            {getIcon()}
            <div className="flex-1">
              <p className={`text-sm font-medium ${getWarningColor(stats.warningLevel)}`}>
                {stats.warningMessage}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
