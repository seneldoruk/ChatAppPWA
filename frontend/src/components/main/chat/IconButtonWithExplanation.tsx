import { GlobeIcon } from "@radix-ui/react-icons";
import {
  Text,
  HoverCard,
  Link,
  Flex,
  Avatar,
  Box,
  Heading,
  Button,
} from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type Props = {
  icon: React.ReactNode;
  explanation: string;
  disabled: boolean;
  onClick: () => void;
};
export function IconButtonWithExplanation({
  explanation,
  onClick,
  disabled,
  children,
  icon,
}: PropsWithChildren<Props>) {
  return (
    <HoverCard.Root>
      <HoverCard.Content side="top">
        <Text as="div" size="2" color="gray">
          {explanation}
        </Text>
      </HoverCard.Content>
      <HoverCard.Trigger>
        <Button disabled={disabled} variant="outline" onClick={onClick}>
          {children}
          {icon}
        </Button>
      </HoverCard.Trigger>
    </HoverCard.Root>
  );
}
