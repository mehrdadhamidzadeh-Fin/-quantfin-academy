import { BlockMath, InlineMath } from "react-katex";

export function Math({ children }: { children: string }) {
  return <InlineMath math={children} />;
}

export function MathBlock({ children }: { children: string }) {
  return (
    <div className="my-3 overflow-x-auto rounded-lg bg-bg-elevated/50 px-4 py-3">
      <BlockMath math={children} />
    </div>
  );
}
