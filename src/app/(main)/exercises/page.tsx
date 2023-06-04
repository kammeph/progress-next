import { db } from '@/lib/drizzle';
import ExercisesPageHeader from './exercises-page-header';
import { ExerciseGroup } from './exercise-group';

export default async function Exercises() {
  const groups = await db.query.exerciseGroups.findMany({
    with: {
      exercises: {
        orderBy: (exercises, { asc }) => [asc(exercises.index)],
      },
    },
    orderBy: (exerciseGroups, { asc }) => [asc(exerciseGroups.index)],
  });

  return (
    <div className='flex flex-col'>
      <ExercisesPageHeader
        maxIndex={
          groups
            ?.map((g) => g.index)
            ?.sort()
            ?.pop() ?? 0
        }
      />
      {groups?.map((group) => (
        <ExerciseGroup group={group} key={group.id} />
      ))}
    </div>
  );
}
