import AdoptionFactors from './adoption-factors';

export default async function VolumeCalculator() {
  return (
    <>
      <h1 className='m-4 text-xl font-anton flex-grow uppercase'>Volume Calculator</h1>
      <AdoptionFactors total={600} />
    </>
  );
}
