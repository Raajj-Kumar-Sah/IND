export default function DataTable({columns,rows}) {
  return <div className="overflow-x-auto border border-white/10"><table className="w-full min-w-[600px] text-left text-xs"><thead className="bg-[#201e19] text-[10px] uppercase tracking-wider text-[#a9a294]"><tr>{columns.map(c=><th className="px-4 py-4 font-semibold" key={c.key}>{c.label}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={row.id||i} className="border-t border-white/10 text-[#d7d1c6]">{columns.map(c=><td className="px-4 py-4" key={c.key}>{c.render?c.render(row[c.key],row):row[c.key]}</td>)}</tr>)}</tbody></table></div>;
}
