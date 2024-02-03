import { Cross1Icon } from "@radix-ui/react-icons";
import { Callout, Container } from "@radix-ui/themes";

export default function ErrorComponent({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <Container my="2">
      <Callout.Root color="red">
        <Callout.Icon>
          <Cross1Icon />
        </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    </Container>
  );
}
