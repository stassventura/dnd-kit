import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const useDndSensors = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  return { sensors };
};

export default useDndSensors;
