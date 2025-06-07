import dynamic from 'next/dynamic';

const NutritionDiarySystem = dynamic(() => import('../../components/NutritionDiarySystem'), { ssr: false });

export default function Page() {
  return <NutritionDiarySystem />;
}
