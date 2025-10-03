import { Group, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import styles from "./Stepper.module.scss";

interface StepperProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function Stepper({
  value,
  onValueChange,
  min = 1,
  max = 99,
  className,
}: StepperProps) {
  const increment = () => {
    if (value < max) {
      onValueChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onValueChange(value - 1);
    }
  };

  return (
    <Group gap={0} className={className}>
      <ActionIcon
        variant="light"
        color="gray"
        size="lg"
        onClick={decrement}
        disabled={value <= min}
        className={styles.iconContainer}
      >
        <IconMinus size={20} className={styles.minus} />
      </ActionIcon>

      <Text h={30} w={30} ta="center" className={styles.stepperText}>
        {value}
      </Text>

      <ActionIcon
        variant="light"
        color="gray"
        size="lg"
        onClick={increment}
        disabled={value >= max}
        className={styles.iconContainer}
      >
        <IconPlus size={20} className={styles.plus} />
      </ActionIcon>
    </Group>
  );
}
