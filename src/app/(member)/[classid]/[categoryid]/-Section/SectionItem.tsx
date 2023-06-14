export default function SectionItem(p: {
  children: React.ReactNode,
  label: string,
}) {
  return (
    <div className="shadow-outline-section rounded-md text-slate-400">
      <div className="p-4">{ p.label }</div>
      <hr />
      <div className="p-2">{ p.children }</div>
    </div>
  );
}