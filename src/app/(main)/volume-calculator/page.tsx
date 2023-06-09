import AdoptionFactors from './adoption-factors';
import StrengthValues from './strength-values';
import { VolumeCalculatorProvider } from './volume-calculator-context';
import VolumeRecommendations from './volume-recommendations';

export default async function VolumeCalculator() {
  return (
    <>
      <h1 className='m-4 text-xl font-anton flex-grow uppercase'>Volume Calculator</h1>
      <VolumeCalculatorProvider>
        <StrengthValues />
        <AdoptionFactors />
        <VolumeRecommendations />
      </VolumeCalculatorProvider>
    </>
  );
}
