import dynamic from 'next/dynamic';

const NutritionMonitoringDashboard = dynamic(() => import('../../components/NutritionMonitoringDashboard'), { ssr: false });

export default function Page() {
  return <NutritionMonitoringDashboard />;
}
