import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PantryItemsCard from '@/components/dashboard/cards/PantryItemsCard';
import RecipesCard from '@/components/dashboard/cards/RecipesCard';
import BoxesCard from '@/components/dashboard/cards/BoxesCard';
import HistoricCard from '@/components/dashboard/cards/HistoricCard';

export const metadata = {
  title: 'Dashboard - Food Loop',
  description: 'Food Loop dashboard',
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <PantryItemsCard />
          </div>
          <div className="md:col-span-2">
            <RecipesCard />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <BoxesCard />
          </div>
          <div className="md:col-span-1">
            <HistoricCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}