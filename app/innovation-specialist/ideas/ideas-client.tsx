"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, FilterX, Lightbulb, ListChecks, SearchX, UserCheck } from "lucide-react";
import { Button, Card, DataTable, Filters, ideaStatusTones, PageHeader, priorityTones, SearchInput, StatusBadge } from "@/components";
import { ideas } from "@/mock-data";
import type { IdeaListItem, IdeaStatus } from "@/types";

type FilterKey = "all" | "assigned" | "waiting-review" | "needs-information" | "under-evaluation" | "recommendation-ready" | "recommendation-submitted" | "returned";

const filterOptions: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "الكل" },
  { key: "assigned", label: "مسندة إليّ" },
  { key: "waiting-review", label: "بانتظار المراجعة" },
  { key: "needs-information", label: "تحتاج استكمال معلومات" },
  { key: "under-evaluation", label: "قيد التقييم" },
  { key: "recommendation-ready", label: "جاهزة لرفع التوصية" },
  { key: "recommendation-submitted", label: "تم رفع التوصية" },
  { key: "returned", label: "معادة للمراجعة" }
];

const statusByFilter: Partial<Record<FilterKey, IdeaStatus>> = {
  "waiting-review": "بانتظار المراجعة",
  "needs-information": "تحتاج استكمال",
  "under-evaluation": "قيد التقييم",
  "recommendation-ready": "جاهزة للتوصية",
  "recommendation-submitted": "تم رفع التوصية",
  "returned": "معادة للمراجعة"
};

const actions: Record<IdeaStatus, string> = {
  "جديدة": "عرض التفاصيل",
  "بانتظار المراجعة": "بدء المراجعة",
  "تحتاج استكمال": "عرض رد المبتكر",
  "قيد التقييم": "استكمال التقييم",
  "جاهزة للتوصية": "رفع التوصية",
  "تم رفع التوصية": "عرض التفاصيل",
  "معادة للمراجعة": "معالجة الملاحظات"
};

const summaryItems: Array<{ label: string; filter: FilterKey; icon: typeof Lightbulb; count: (rows: IdeaListItem[]) => number }> = [
  { label: "جميع الأفكار", filter: "all", icon: Lightbulb, count: rows => rows.length },
  { label: "مسندة إليّ", filter: "assigned", icon: UserCheck, count: rows => rows.filter(row => row.assignedToMe).length },
  { label: "بانتظار المراجعة", filter: "waiting-review", icon: ListChecks, count: rows => rows.filter(row => row.status === "بانتظار المراجعة").length },
  { label: "تحتاج استكمال", filter: "needs-information", icon: ListChecks, count: rows => rows.filter(row => row.status === "تحتاج استكمال").length },
  { label: "قيد التقييم", filter: "under-evaluation", icon: ListChecks, count: rows => rows.filter(row => row.status === "قيد التقييم").length },
  { label: "جاهزة للتوصية", filter: "recommendation-ready", icon: ListChecks, count: rows => rows.filter(row => row.status === "جاهزة للتوصية").length }
];

const pageSize = 5;
const selectClass = "h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700";

export function IdeasClient({ initialFilter }: { initialFilter: string }) {
  const router = useRouter();
  const validInitial = filterOptions.some(option => option.key === initialFilter) ? initialFilter as FilterKey : "all";
  const [activeFilter, setActiveFilter] = useState<FilterKey>(validInitial);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [date, setDate] = useState("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => Array.from(new Set(ideas.map(idea => idea.category))), []);
  const filteredIdeas = useMemo(() => ideas.filter(idea => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ar");
    const matchesSearch = !normalizedSearch || idea.title.toLocaleLowerCase("ar").includes(normalizedSearch) || idea.innovator.toLocaleLowerCase("ar").includes(normalizedSearch);
    const expectedStatus = statusByFilter[activeFilter];
    const matchesMainFilter = activeFilter === "all" || (activeFilter === "assigned" ? idea.assignedToMe : idea.status === expectedStatus);
    const matchesCategory = category === "all" || idea.category === category;
    const matchesPriority = priority === "all" || idea.priority === priority;
    const matchesDate = date === "all" || (date === "7days" ? idea.submittedDate.includes("أغسطس") : date === "30days" ? /يوليو|أغسطس/.test(idea.submittedDate) : false);
    return matchesSearch && matchesMainFilter && matchesCategory && matchesPriority && matchesDate;
  }), [activeFilter, category, date, priority, search]);

  useEffect(() => setPage(1), [activeFilter, category, date, priority, search]);

  const pageCount = Math.max(1, Math.ceil(filteredIdeas.length / pageSize));
  const visibleIdeas = filteredIdeas.slice((page - 1) * pageSize, page * pageSize);
  const hasFilters = activeFilter !== "all" || search !== "" || category !== "all" || priority !== "all" || date !== "all";
  const clearFilters = () => { setActiveFilter("all"); setSearch(""); setCategory("all"); setPriority("all"); setDate("all"); };
  const openIdea = (id: string) => router.push(`/innovation-specialist/ideas/${id}`);

  return <div className="mx-auto max-w-[1600px]">
    <PageHeader title="الأفكار" description="مراجعة الأفكار المسندة ومتابعة حالاتها وإجراءاتها." />

    <section aria-label="ملخص الأفكار" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {summaryItems.map(item => { const Icon = item.icon; return <button key={item.filter} onClick={() => setActiveFilter(item.filter)} className={`rounded-xl border bg-white p-4 text-right shadow-card transition-colors ${activeFilter === item.filter ? "border-brand-600 ring-1 ring-brand-600" : "border-slate-200 hover:border-brand-100"}`}><span className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-500">{item.label}</span><Icon className="h-4 w-4 text-brand-700"/></span><span className="mt-3 block text-2xl font-bold text-slate-900">{item.count(ideas)}</span></button>; })}
    </section>

    <Card className="mt-6">
      <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_auto] lg:items-center">
        <SearchInput value={search} onChange={event => setSearch(event.target.value)} placeholder="ابحث بعنوان الفكرة أو اسم المبتكر" />
        <div className="flex flex-wrap gap-2">
          <select aria-label="التصنيف" value={category} onChange={event => setCategory(event.target.value)} className={selectClass}><option value="all">كل التصنيفات</option>{categories.map(item => <option key={item}>{item}</option>)}</select>
          <select aria-label="الأولوية" value={priority} onChange={event => setPriority(event.target.value)} className={selectClass}><option value="all">كل الأولويات</option><option>عاجلة</option><option>عالية</option><option>متوسطة</option><option>منخفضة</option></select>
          <select aria-label="تاريخ التقديم" value={date} onChange={event => setDate(event.target.value)} className={selectClass}><option value="all">كل تواريخ التقديم</option><option value="7days">آخر 7 أيام</option><option value="30days">آخر 30 يومًا</option><option value="older">أقدم من 30 يومًا</option></select>
        </div>
      </div>

      <Filters><div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">{filterOptions.map(option => <Button key={option.key} type="button" variant={activeFilter === option.key ? "primary" : "secondary"} className="min-h-9 px-3 text-xs" onClick={() => setActiveFilter(option.key)}>{option.label}</Button>)}{hasFilters && <Button type="button" variant="ghost" className="min-h-9 px-3 text-xs text-red-600" onClick={clearFilters}><FilterX className="h-4 w-4"/>مسح عوامل التصفية</Button>}</div></Filters>
    </Card>

    <div className="mt-5 flex items-center justify-between gap-3"><p className="text-sm text-slate-500">عرض <span className="font-semibold text-slate-900">{filteredIdeas.length}</span> من أصل {ideas.length} فكرة</p></div>

    <div className="mt-3">
      {visibleIdeas.length > 0 ? <DataTable headers={["عنوان الفكرة", "المبتكر", "نوع المبتكر", "التصنيف", "الحالة", "الأولوية", "تاريخ الإسناد", "آخر تحديث", "الإجراء"]}>
        {visibleIdeas.map(idea => <tr key={idea.id} tabIndex={0} onClick={() => openIdea(idea.id)} onKeyDown={event => { if (event.key === "Enter") openIdea(idea.id); }} className="cursor-pointer border-t border-slate-100 transition-colors hover:bg-slate-50 focus:bg-brand-50/50 focus:outline-none">
          <td className="min-w-64 px-4 py-4"><span className="font-semibold text-slate-900">{idea.title}</span><span className="mt-1 block text-xs text-slate-400">{idea.id}</span></td>
          <td className="whitespace-nowrap px-4 py-4 text-slate-700">{idea.innovator}</td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{idea.innovatorType}</td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{idea.category}</td>
          <td className="whitespace-nowrap px-4 py-4"><StatusBadge tone={ideaStatusTones[idea.status]}>{idea.status}</StatusBadge></td><td className="whitespace-nowrap px-4 py-4"><StatusBadge tone={priorityTones[idea.priority]}>{idea.priority}</StatusBadge></td>
          <td className="whitespace-nowrap px-4 py-4 text-slate-600">{idea.assignedDate}</td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{idea.lastUpdated}</td>
          <td className="whitespace-nowrap px-4 py-4"><Button type="button" className="min-h-9 px-3 text-xs" onClick={event => { event.stopPropagation(); openIdea(idea.id); }}>{actions[idea.status]}</Button></td>
        </tr>)}
      </DataTable> : <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"><span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-500"><SearchX className="h-6 w-6"/></span><h2 className="mt-4 font-semibold text-slate-900">لا توجد أفكار مطابقة</h2><p className="mt-1 text-sm text-slate-500">جرّب تعديل البحث أو مسح عوامل التصفية الحالية.</p><Button type="button" variant="secondary" className="mt-5" onClick={clearFilters}>مسح عوامل التصفية</Button></div>}
    </div>

    {filteredIdeas.length > 0 && <nav aria-label="التنقل بين الصفحات" className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-slate-500">الصفحة {page} من {pageCount}</p><div className="flex items-center gap-2"><Button type="button" variant="secondary" className="min-h-9 px-3" disabled={page === 1} onClick={() => setPage(current => current - 1)}><ChevronRight className="h-4 w-4"/>السابق</Button>{Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <Button key={number} type="button" variant={page === number ? "primary" : "secondary"} className="h-9 min-h-9 w-9 px-0" onClick={() => setPage(number)}>{number}</Button>)}<Button type="button" variant="secondary" className="min-h-9 px-3" disabled={page === pageCount} onClick={() => setPage(current => current + 1)}>التالي<ChevronLeft className="h-4 w-4"/></Button></div></nav>}
  </div>;
}
