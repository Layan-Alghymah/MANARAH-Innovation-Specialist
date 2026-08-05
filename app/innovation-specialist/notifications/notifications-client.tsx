"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Bell, BellRing, CheckCheck, ClipboardCheck, FileCheck2, FilterX, FolderKanban, Info, Lightbulb, MailCheck, MessageSquareReply, RotateCcw, SearchX, Settings, Trash2 } from "lucide-react";
import { Button, Card, ConfirmDialog, EmptyState, PageHeader, priorityTones, SearchInput, StatusBadge } from "@/components";
import type { IdeaPriority, StatusTone } from "@/types";

type NotificationType = "ideas" | "evaluations" | "recommendations" | "projects" | "system";
type FilterKey = "all" | "unread" | "action" | NotificationType;
type NotificationItem = {
  id: number; title: string; description: string; type: NotificationType; date: string; read: boolean; priority?: IdeaPriority; actionRequired?: boolean; related: string; action: string; href: string; icon: typeof Bell;
};

const initialNotifications: NotificationItem[] = [
  { id: 1, title: "تم إسناد فكرة جديدة إليك", description: "تحتاج الفكرة إلى مراجعة أولية وتحديد الإجراء التالي.", type: "ideas", date: "اليوم، 10:45 ص", read: false, priority: "عالية", actionRequired: true, related: "نظام تحليل استباقي لمخاطر السلامة", action: "عرض الفكرة", href: "/innovation-specialist/ideas/IDEA-1062", icon: Lightbulb },
  { id: 2, title: "قام المبتكر بالرد على طلب الاستكمال", description: "تمت إضافة إجابة ومرفقين جديدين إلى طلب المعلومات.", type: "ideas", date: "اليوم، 9:20 ص", read: false, priority: "عالية", actionRequired: true, related: "منصة لمشاركة المعرفة المؤسسية", action: "مراجعة الرد", href: "/innovation-specialist/ideas/IDEA-1051?tab=communication", icon: MessageSquareReply },
  { id: 3, title: "اقترب موعد استحقاق تقييم", description: "يتبقى أقل من يوم على الموعد المحدد لإكمال التقييم.", type: "evaluations", date: "اليوم، 8:15 ص", read: false, priority: "عالية", actionRequired: true, related: "منصة ذكية لإدارة الطاقة في المباني", action: "متابعة التقييم", href: "/innovation-specialist/ideas/IDEA-1058?tab=evaluation", icon: AlertTriangle },
  { id: 4, title: "أصبح التقييم جاهزًا لرفع التوصية", description: "اكتملت معايير التقييم ويمكن إعداد التوصية التشغيلية.", type: "recommendations", date: "أمس، 4:30 م", read: false, actionRequired: true, related: "مساعد رقمي لخدمة المستفيدين", action: "رفع التوصية", href: "/innovation-specialist/ideas/IDEA-1054?tab=recommendation", icon: FileCheck2 },
  { id: 5, title: "أعاد مسؤول الجهة التوصية للمراجعة", description: "يرجى توضيح مخاطر التنفيذ وخطة معالجة جودة البيانات.", type: "recommendations", date: "أمس، 1:10 م", read: false, priority: "متوسطة", actionRequired: true, related: "مؤشر استباقي لقياس رضا المستفيد", action: "معالجة الملاحظات", href: "/innovation-specialist/ideas/IDEA-1026?tab=recommendation", icon: RotateCcw },
  { id: 6, title: "تم اعتماد فكرة سبق أن قيّمتها", description: "اعتمد مسؤول الجهة الفكرة بعد مراجعة التوصية المرفوعة.", type: "ideas", date: "5 أغسطس 2026، 3:40 م", read: true, related: "نظام تنبؤ بالأعطال التشغيلية", action: "عرض الفكرة", href: "/innovation-specialist/ideas/IDEA-1042", icon: CheckCheck },
  { id: 7, title: "تمت إضافة تحديث جديد على مشروع", description: "أضاف مدير المشروع ملخص تقدم المرحلة الحالية ومرفقًا داعمًا.", type: "projects", date: "5 أغسطس 2026، 11:30 ص", read: true, related: "مشروع إدارة الطاقة الذكية", action: "عرض المشروع", href: "/innovation-specialist/projects/PRJ-224", icon: FolderKanban },
  { id: 8, title: "تجاوز أحد متطلبات المشروع موعده", description: "لم يكتمل متطلب اعتماد مصادر بيانات العدادات في موعده.", type: "projects", date: "4 أغسطس 2026، 2:20 م", read: false, priority: "عالية", actionRequired: true, related: "مشروع إدارة الطاقة الذكية", action: "متابعة المتطلب", href: "/innovation-specialist/projects/PRJ-224", icon: AlertTriangle },
  { id: 9, title: "تم تعديل الجدول الزمني للمشروع", description: "تم تحديث تاريخ مرحلة التجربة الأولية وموعد الإطلاق المتوقع.", type: "projects", date: "3 أغسطس 2026، 10:05 ص", read: true, related: "مشروع المساعد الرقمي للمستفيدين", action: "عرض المشروع", href: "/innovation-specialist/projects/PRJ-215", icon: ClipboardCheck },
  { id: 10, title: "تحديث مجدول للمنصة", description: "ستجرى أعمال صيانة دورية خارج ساعات العمل دون تأثير على البيانات.", type: "system", date: "2 أغسطس 2026، 9:00 ص", read: true, related: "منصة منارة", action: "عرض التفاصيل", href: "/innovation-specialist/notifications", icon: Settings }
];

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "الكل" }, { key: "unread", label: "غير مقروء" }, { key: "action", label: "تتطلب إجراء" }, { key: "ideas", label: "الأفكار" }, { key: "evaluations", label: "التقييمات" }, { key: "recommendations", label: "التوصيات" }, { key: "projects", label: "المشاريع" }, { key: "system", label: "النظام" }
];
const typeLabels: Record<NotificationType, string> = { ideas: "الأفكار", evaluations: "التقييمات", recommendations: "التوصيات", projects: "المشاريع", system: "النظام" };
const typeTones: Record<NotificationType, StatusTone> = { ideas: "info", evaluations: "warning", recommendations: "success", projects: "neutral", system: "neutral" };
const summaries: Array<{ label: string; filter: FilterKey; icon: typeof Bell; count: (items: NotificationItem[]) => number }> = [
  { label: "جميع الإشعارات", filter: "all", icon: Bell, count: items => items.length },
  { label: "غير المقروءة", filter: "unread", icon: BellRing, count: items => items.filter(item => !item.read).length },
  { label: "تتطلب إجراء", filter: "action", icon: AlertTriangle, count: items => items.filter(item => item.actionRequired).length },
  { label: "الأفكار", filter: "ideas", icon: Lightbulb, count: items => items.filter(item => item.type === "ideas").length },
  { label: "التقييمات", filter: "evaluations", icon: ClipboardCheck, count: items => items.filter(item => item.type === "evaluations").length },
  { label: "المشاريع", filter: "projects", icon: FolderKanban, count: items => items.filter(item => item.type === "projects").length }
];

export function NotificationsClient() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const filtered = useMemo(() => notifications.filter(item => {
    const query = search.trim().toLocaleLowerCase("ar");
    const matchesSearch = !query || item.title.toLocaleLowerCase("ar").includes(query) || item.description.toLocaleLowerCase("ar").includes(query) || item.related.toLocaleLowerCase("ar").includes(query);
    const matchesFilter = activeFilter === "all" || (activeFilter === "unread" ? !item.read : activeFilter === "action" ? item.actionRequired : item.type === activeFilter);
    return matchesSearch && matchesFilter;
  }), [activeFilter, notifications, search]);

  const notify = (text: string) => { setMessage(text); window.setTimeout(() => setMessage(""), 3000); };
  const markRead = (id: number) => setNotifications(current => current.map(item => item.id === id ? { ...item, read: true } : item));
  const markAllRead = () => { setNotifications(current => current.map(item => ({ ...item, read: true }))); notify("تم تعليم جميع الإشعارات كمقروءة."); };
  const clearFilters = () => { setActiveFilter("all"); setSearch(""); };
  const remove = (id: number) => setPendingDelete(id);
  const confirmRemove = () => { if (pendingDelete === null) return; setNotifications(current => current.filter(item => item.id !== pendingDelete)); notify("تمت إزالة الإشعار من القائمة."); };
  const open = (item: NotificationItem) => { markRead(item.id); router.push(item.href); };
  const hasFilters = activeFilter !== "all" || search !== "";

  return <div className="mx-auto max-w-[1500px]">
    {message && <div role="status" className="fixed left-5 top-20 z-50 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-card"><CheckCheck className="h-4 w-4"/>{message}</div>}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><PageHeader title="الإشعارات" description="متابعة التحديثات والإجراءات المطلوبة المتعلقة بالأفكار والتقييمات والمشاريع."/><div className="flex shrink-0 flex-wrap gap-2"><Button variant="secondary" onClick={markAllRead}><MailCheck className="h-4 w-4"/>تعليم الكل كمقروء</Button><Button variant="ghost" onClick={clearFilters} disabled={!hasFilters}><FilterX className="h-4 w-4"/>مسح الفلاتر</Button></div></div>

    <section aria-label="ملخص الإشعارات" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{summaries.map(item=>{const Icon=item.icon;return <button key={item.filter} onClick={()=>setActiveFilter(item.filter)} className={`rounded-xl border bg-white p-4 text-right shadow-card transition-colors ${activeFilter===item.filter?"border-brand-600 ring-1 ring-brand-600":"border-slate-200 hover:border-brand-100"}`}><span className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-500">{item.label}</span><Icon className="h-4 w-4 text-brand-700"/></span><strong className="mt-3 block text-2xl text-slate-900">{item.count(notifications)}</strong></button>})}</section>

    <Card className="mt-6"><SearchInput value={search} onChange={event=>setSearch(event.target.value)} placeholder="ابحث في الإشعارات"/><div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">{filters.map(filter=><Button key={filter.key} variant={activeFilter===filter.key?"primary":"secondary"} className="min-h-9 px-3 text-xs" onClick={()=>setActiveFilter(filter.key)}>{filter.label}</Button>)}</div></Card>

    <div className="mt-5 flex items-center justify-between"><p className="text-sm text-slate-500">عرض <strong className="text-slate-900">{filtered.length}</strong> من أصل {notifications.length} إشعارات</p></div>
    <div className="mt-3 space-y-3">{filtered.length>0 ? filtered.map(item=>{const Icon=item.icon;return <Card key={item.id} className={`relative p-0 transition-colors ${!item.read?"border-brand-100 bg-brand-50/30":""}`}><div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-5">{!item.read&&<span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-600" aria-label="غير مقروء"/>}<span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${!item.read?"bg-brand-100 text-brand-800":"bg-slate-100 text-slate-600"}`}><Icon className="h-5 w-5"/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className={`text-sm text-slate-900 ${!item.read?"font-extrabold":"font-semibold"}`}>{item.title}</h2><StatusBadge tone={typeTones[item.type]}>{typeLabels[item.type]}</StatusBadge>{item.priority&&<StatusBadge tone={priorityTones[item.priority]}>{item.priority}</StatusBadge>}{item.actionRequired&&<StatusBadge tone="danger">يتطلب إجراء</StatusBadge>}</div><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p><div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400"><span>{item.date}</span><span>السجل المرتبط: <strong className="text-slate-600">{item.related}</strong></span></div></div><div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end"><Button className="min-h-9 px-3 text-xs" onClick={()=>open(item)}>{item.action}</Button>{!item.read&&<Button variant="secondary" className="min-h-9 px-3 text-xs" onClick={()=>markRead(item.id)}>تعليم كمقروء</Button>}<Button variant="ghost" className="min-h-9 px-3 text-red-600" aria-label="إزالة الإشعار" onClick={()=>remove(item.id)}><Trash2 className="h-4 w-4"/></Button></div></div></Card>}) : <EmptyState title="لا توجد إشعارات مطابقة" description="جرّب تعديل البحث أو مسح الفلاتر الحالية." icon={<span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-500"><SearchX className="h-6 w-6"/></span>}/>}</div>

    {notifications.length===0&&<div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800"><Info className="ml-2 inline h-4 w-4"/>لا توجد إشعارات في صندوق الوارد حاليًا.</div>}
    <ConfirmDialog open={pendingDelete!==null} title="إزالة الإشعار" description="سيُزال هذا الإشعار من القائمة المحلية. هل تريد المتابعة؟" confirmLabel="إزالة" danger onClose={()=>setPendingDelete(null)} onConfirm={confirmRemove}/>
  </div>;
}
