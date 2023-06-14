import { db } from '@/lib/drizzle';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adaptionFactorsSchema } from '@/lib/drizzle/schema/adaption-factors';
import { eq } from 'drizzle-orm';
import AdaptionFactors from './adaption-factors';
import { VolumeCalculatorProvider } from './volume-calculator-context';
import StrengthValues from './strength-values';
import VolumeRecommendations from './volume-recommendations';
import { handleAdaptionFactorsUpdate, handleStrengthValuesUpdate } from './_actions';
import { strengthValuesSchema } from '@/lib/drizzle/schema/strength-values';

export default async function VolumeCalculatorPage() {
  const userId = cookies().get('userId')?.value;
  if (!userId) redirect('/login');
  const [adaptionFactors, strengthValues] = await Promise.all([
    db.select().from(adaptionFactorsSchema).where(eq(adaptionFactorsSchema.userId, userId)),
    db.select().from(strengthValuesSchema).where(eq(strengthValuesSchema.userId, userId)),
  ]);

  return (
    <>
      <h1 className='m-4 text-xl font-anton flex-grow uppercase'>Volume Calculator</h1>
      <VolumeCalculatorProvider>
        <StrengthValues strengthValues={strengthValues?.[0]} updateStrengthValues={handleStrengthValuesUpdate} />
        <AdaptionFactors adaptionFactors={adaptionFactors?.[0]} updateAdaptionFactors={handleAdaptionFactorsUpdate} />
        <VolumeRecommendations />
      </VolumeCalculatorProvider>
    </>
  );
}
