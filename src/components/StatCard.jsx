export default function StatCard({label,value,change,icon:Icon}) {
  return <div className="stat-card"><div className="flex items-center justify-between"><span className="text-xs text-[#99948a]">{label}</span>{Icon&&<Icon size={18} className="text-gold"/>}</div><div className="mt-4 flex items-end justify-between"><strong className="serif text-3xl">{value}</strong>{change&&<span className="text-[10px] text-emerald-400">{change}</span>}</div></div>;
}
