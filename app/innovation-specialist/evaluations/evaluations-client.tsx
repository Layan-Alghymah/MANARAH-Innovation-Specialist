"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCheck, ChevronLeft, ChevronRight, ClipboardList, FilePenLine, FilterX, SearchX, Send, TimerReset } from "lucide-react";
import { Button, Card, DataTable, evaluationStatusTones, PageHeader, priorityTones, Progress, SearchInput, StatusBadge } from "@/components";
import { evaluations } from "@/mock-data";
import type { EvaluationListItem, EvaluationStatus } from "@/types";

type FilterKey = "all" | EvaluationStatus;
const filterOptions: FilterKey[] = ["all", "مسودة", "قيد التقييم", "جاهزة للتوصية", "تم رفع التوصية", "معادة للمراجعة"];
const statusTones = evaluationStatusTones;
const pageSize = 5;
const selectClass = "h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700";

const summaryItems: Array<{ label: string; status?: EvaluationStatus; icon: typeof ClipboardList }> = [
  { label: "إجمالي التقييمات", icon: ClipboardList },
  { label: "مسودات التقييم", status: "مسودة", icon: FilePenLine },
  { label: "قيد التقييم", status: "قيد التقييم", icon: TimerReset },
  { label: "جاهزة للتوصية", status: "جاهزة للتوصية", icon: CheckCheck },
  { label: "تم رفع التوصية", status: "تم رفع التوصية", icon: Send },
  { label: "معادة للمراجعة", status: "معادة للمراجعة", icon: AlertTriangle }
];

function actionFor(evaluation: EvaluationListItem) {
  if (evaluation.status === "مسودة") return "بدء التقييم";
  if (evaluation.status === "قيد التقييم") return evaluation.completion >= 75 ? "مراجعة التقييم" : "متابعة التقييم";
  if (evaluation.status === "جاهزة للتوصية") return "رفع التوصية";
  if (evaluation.status === "تم رفع التوصية") return "عرض التوصية";
  return "معالجة الملاحظات";
}

function destination(evaluation: EvaluationListItem) {
  const tab = evaluation.status === "جاهزة للتوصية" || evaluation.status === "تم رفع التوصية" ? "recommendation" : "evaluation";
  return `/innovation-specialist/ideas/${evaluation.id}?tab=${tab}`;
}

export function EvaluationsClient() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [updated, setUpdated] = useState("all");
  const [page, setPage] = useState(1);
  const categories = useMemo(() => Array.from(new Set(evaluations.map(item => item.category))), []);

  const filtered = useMemo(() => evaluations.filter(item => {
    const query = search.trim().toLocaleLowerCase("ar");
    return (!query || item.title.toLocaleLowerCase("ar").includes(query) || item.innovator.toLocaleLowerCase("ar").includes(query))
      && (activeFilter === "all" || item.status === activeFilter)
      && (category === "all" || item.category === category)
      && (priority === "all" || item.priority === priority)
      && (updated === "all" || item.updatePeriod === updated);
  }), [activeFilter, category, priority, search, updated]);

  useEffect(() => setPage(1), [activeFilter, category, priority, search, updated]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const hasFilters = activeFilter !== "all" || search !== "" || category !== "all" || priority !== "all" || updated !== "all";
  const urgent = evaluations.filter(item => item.urgent).slice(0, 4);
  const clearFilters = () => { setActiveFilter("all"); setSearch(""); setCategory("all"); setPriority("all"); setUpdated("all"); };
  const open = (item: EvaluationListItem) => router.push(destination(item));

  return <div className="mx-auto max-w-[1600px]">
    <PageHeader title="التقييمات" description="متابعة التقييمات الجارية، والمسودات، والتقييمات المكتملة، والتوصيات الجاهزة للرفع." />

    <section aria-label="ملخص التقييمات" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {summaryItems.map(item => { const Icon=item.icon; const count=item.status ? evaluations.filter(row=>row.status===item.status).length : evaluations.length; const selected=item.status ? activeFilter===item.status : activeFilter==="all"; return <button key={item.label} onClick={()=>setActiveFilter(item.status??"all")} className={`rounded-xl border bg-white p-4 text-right shadow-card transition-colors ${selected?"border-brand-600 ring-1 ring-brand-600":"border-slate-200 hover:border-brand-100"}`}><span className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-500">{item.label}</span><Icon className="h-4 w-4 text-brand-700"/></span><strong className="mt-3 block text-2xl text-slate-900">{count}</strong></button>; })}
    </section>

    <section className="mt-8"><div className="mb-4"><h2 className="text-lg font-bold text-slate-900">أولوية المتابعة</h2><p className="mt-1 text-sm text-slate-500">تقييمات تحتاج إلى إجراء عاجل حسب الموعد والأولوية.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{urgent.map(item=><Card key={item.id} className="flex flex-col"><div className="flex items-start justify-between gap-3"><StatusBadge tone={statusTones[item.status]}>{item.status}</StatusBadge><StatusBadge tone={priorityTones[item.priority]}>{item.priority}</StatusBadge></div><h3 className="mt-4 min-h-12 text-sm font-bold leading-6 text-slate-900">{item.title}</h3><p className="mt-1 text-xs text-slate-500">{item.innovator}</p><div className="mt-5"><Progress value={item.completion}/></div><p className="mt-3 text-xs text-slate-500">الاستحقاق: <span className="font-semibold text-slate-700">{item.dueDate}</span></p><Button className="mt-5 w-full" onClick={()=>open(item)}>{actionFor(item)}</Button></Card>)}</div></section>

    <Card className="mt-8"><div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_auto] lg:items-center"><SearchInput value={search} onChange={event=>setSearch(event.target.value)} placeholder="ابحث بعنوان الفكرة أو اسم المبتكر"/><div className="flex flex-wrap gap-2"><select aria-label="التصنيف" value={category} onChange={event=>setCategory(event.target.value)} className={selectClass}><option value="all">كل التصنيفات</option>{categories.map(item=><option key={item}>{item}</option>)}</select><select aria-label="الأولوية" value={priority} onChange={event=>setPriority(event.target.value)} className={selectClass}><option value="all">كل الأولويات</option><option>عاجلة</option><option>عالية</option><option>متوسطة</option><option>منخفضة</option></select><select aria-label="تاريخ آخر تحديث" value={updated} onChange={event=>setUpdated(event.target.value)} className={selectClass}><option value="all">كل التحديثات</option><option value="today">اليوم</option><option value="week">آخر 7 أيام</option><option value="month">آخر 30 يومًا</option></select></div></div><div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">{filterOptions.map(filter=><Button key={filter} type="button" variant={activeFilter===filter?"primary":"secondary"} className="min-h-9 px-3 text-xs" onClick={()=>setActiveFilter(filter)}>{filter==="all"?"الكل":filter}</Button>)}{hasFilters&&<Button type="button" variant="ghost" className="min-h-9 px-3 text-xs text-red-600" onClick={clearFilters}><FilterX className="h-4 w-4"/>مسح عوامل التصفية</Button>}</div></Card>

    <p className="mt-5 text-sm text-slate-500">عرض <strong className="text-slate-900">{filtered.length}</strong> من أصل {evaluations.length} تقييمات</p>
    <div className="mt-3">{visible.length>0?<DataTable headers={["عنوان الفكرة","المبتكر","التصنيف","حالة التقييم","متوسط الدرجة","مستوى الاكتمال","آخر تحديث","تاريخ الاستحقاق","الإجراء"]}>{visible.map(item=><tr key={item.id} tabIndex={0} onClick={()=>open(item)} onKeyDown={event=>{if(event.key==="Enter")open(item)}} className="cursor-pointer border-t border-slate-100 transition-colors hover:bg-slate-50 focus:bg-brand-50/50 focus:outline-none"><td className="min-w-64 px-4 py-4"><span className="font-semibold text-slate-900">{item.title}</span><span className="mt-1 block text-xs text-slate-400">{item.id}</span></td><td className="whitespace-nowrap px-4 py-4 text-slate-700">{item.innovator}</td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{item.category}</td><td className="whitespace-nowrap px-4 py-4"><StatusBadge tone={statusTones[item.status]}>{item.status}</StatusBadge></td><td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{item.averageScore===null?"لم يبدأ":`${item.averageScore} / 5`}</td><td className="px-4 py-4"><Progress value={item.completion}/></td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{item.lastUpdated}</td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{item.dueDate}</td><td className="whitespace-nowrap px-4 py-4"><Button className="min-h-9 px-3 text-xs" onClick={event=>{event.stopPropagation();open(item)}}>{actionFor(item)}</Button></td></tr>)}</DataTable>:<div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"><span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-500"><SearchX className="h-6 w-6"/></span><h2 className="mt-4 font-semibold">لا توجد تقييمات مطابقة</h2><p className="mt-1 text-sm text-slate-500">جرّب تعديل البحث أو مسح عوامل التصفية الحالية.</p><Button variant="secondary" className="mt-5" onClick={clearFilters}>مسح عوامل التصفية</Button></div>}</div>

    {filtered.length>0&&<nav aria-label="التنقل بين الصفحات" className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-slate-500">الصفحة {page} من {pageCount}</p><div className="flex items-center gap-2"><Button variant="secondary" className="min-h-9 px-3" disabled={page===1} onClick={()=>setPage(current=>current-1)}><ChevronRight className="h-4 w-4"/>السابق</Button>{Array.from({length:pageCount},(_,index)=>index+1).map(number=><Button key={number} variant={page===number?"primary":"secondary"} className="h-9 min-h-9 w-9 px-0" onClick={()=>setPage(number)}>{number}</Button>)}<Button variant="secondary" className="min-h-9 px-3" disabled={page===pageCount} onClick={()=>setPage(current=>current+1)}>التالي<ChevronLeft className="h-4 w-4"/></Button></div></nav>}
  </div>;
}

