import { Metadata } from "./metadata";
import { Analytics } from "./Analytics";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <Analytics>
      <Metadata />
      {children}
    </Analytics>
  );
}