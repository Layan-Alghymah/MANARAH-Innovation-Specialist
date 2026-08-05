import type { EvaluationListItem, IdeaListItem, ProjectListItem } from "@/types";

export const specialistProfile = { name: "سارة الأحمد", role: "مسؤول الابتكار", initials: "س أ" };

export const dashboardKpis = [
  { label: "الأفكار المسندة", value: 24, context: "4 أفكار أُسندت خلال هذا الأسبوع", href: "/innovation-specialist/ideas?filter=assigned" },
  { label: "بانتظار المراجعة", value: 7, context: "فكرتان تستحقان الإجراء اليوم", href: "/innovation-specialist/ideas?filter=waiting-review" },
  { label: "تحتاج استكمال معلومات", value: 5, context: "3 ردود جديدة من المبتكرين", href: "/innovation-specialist/ideas?filter=needs-information" },
  { label: "قيد التقييم", value: 6, context: "تقييم واحد يقترب موعده النهائي", href: "/innovation-specialist/ideas?filter=under-evaluation" },
  { label: "جاهزة لرفع التوصية", value: 3, context: "بانتظار المراجعة النهائية منك", href: "/innovation-specialist/ideas?filter=recommendation-ready" },
  { label: "المشاريع النشطة", value: 8, context: "مشروعان حُدّثا خلال 24 ساعة", href: "/innovation-specialist/projects?filter=in-progress" }
] as const;

export const dashboardTasks = [
  { id: "IDEA-1058", title: "منصة ذكية لإدارة الطاقة في المباني", innovator: "أحمد العتيبي", category: "الاستدامة", status: "بانتظار المراجعة", tone: "warning", dueDate: "اليوم، 2:30 م", priority: "عاجلة", priorityTone: "danger", action: "بدء المراجعة" },
  { id: "IDEA-1051", title: "منصة لمشاركة المعرفة المؤسسية", innovator: "نورة القحطاني", category: "إدارة المعرفة", status: "تحتاج استكمال", tone: "danger", dueDate: "اليوم، 4:00 م", priority: "عالية", priorityTone: "danger", action: "مراجعة رد المبتكر" },
  { id: "IDEA-1047", title: "حل ذكي لتحسين تجربة الموظفين", innovator: "فريق تجربة", category: "تجربة الموظف", status: "قيد التقييم", tone: "info", dueDate: "غدًا، 11:00 ص", priority: "متوسطة", priorityTone: "warning", action: "استكمال التقييم" },
  { id: "IDEA-1054", title: "مساعد رقمي لخدمة المستفيدين", innovator: "ريم الحربي", category: "الخدمات الذكية", status: "جاهزة للتوصية", tone: "success", dueDate: "7 أغسطس 2026", priority: "متوسطة", priorityTone: "warning", action: "رفع التوصية" },
  { id: "PRJ-208", title: "مشروع منصة المعرفة المؤسسية", innovator: "نورة الغامدي", category: "إدارة المعرفة", status: "قيد التنفيذ", tone: "success", dueDate: "8 أغسطس 2026", priority: "منخفضة", priorityTone: "neutral", action: "متابعة المشروع", project: true }
] as const;

export const recentlyAssignedIdeas = [
  { id: "IDEA-1058", title: "منصة ذكية لإدارة الطاقة في المباني", innovator: "أحمد العتيبي", category: "الاستدامة", assignedDate: "اليوم، 9:15 ص", status: "جديدة", tone: "info" },
  { id: "IDEA-1038", title: "بوابة موحدة لرحلة الموظف", innovator: "ليان الغامدي", category: "تجربة الموظف", assignedDate: "أمس، 1:40 م", status: "بانتظار المراجعة", tone: "warning" },
  { id: "IDEA-1056", title: "نظام لتقليل الهدر الغذائي", innovator: "فريق الأثر المستدام", category: "الاستدامة", assignedDate: "3 أغسطس 2026", status: "بانتظار المراجعة", tone: "warning" }
] as const;

export const dashboardNotifications = [
  { id: 1, title: "تم إسناد فكرة جديدة إليك", detail: "لوحة تنبؤية لقياس رضا المستفيد", time: "منذ 18 دقيقة", kind: "idea" },
  { id: 2, title: "قام المبتكر بالرد على طلب الاستكمال", detail: "منصة موحدة لإدارة المعرفة المؤسسية", time: "منذ ساعة", kind: "reply" },
  { id: 3, title: "تمت إعادة التوصية للمراجعة", detail: "مساعد رقمي لخدمة المستفيدين", time: "منذ 3 ساعات", kind: "return" },
  { id: 4, title: "تم اعتماد فكرة قمت بتقييمها", detail: "توحيد نماذج قياس الأداء", time: "أمس، 3:25 م", kind: "approved" },
  { id: 5, title: "تمت إضافة تحديث جديد على مشروع", detail: "أتمتة إجراءات طلبات الصيانة", time: "أمس، 11:10 ص", kind: "project" }
] as const;

export const ideas: IdeaListItem[] = [
  { id: "IDEA-1058", title: "منصة ذكية لإدارة الطاقة في المباني", innovator: "أحمد العتيبي", innovatorType: "فرد", category: "الاستدامة", status: "بانتظار المراجعة", priority: "عالية", assignedToMe: true, assignedDate: "5 أغسطس 2026", submittedDate: "4 أغسطس 2026", lastUpdated: "منذ 35 دقيقة" },
  { id: "IDEA-1056", title: "نظام لتقليل الهدر الغذائي", innovator: "فريق الأثر المستدام", innovatorType: "فريق ابتكار", category: "الاستدامة", status: "جديدة", priority: "متوسطة", assignedToMe: false, assignedDate: "—", submittedDate: "3 أغسطس 2026", lastUpdated: "منذ ساعتين" },
  { id: "IDEA-1054", title: "مساعد رقمي لخدمة المستفيدين", innovator: "ريم الحربي", innovatorType: "فرد", category: "الخدمات الذكية", status: "جاهزة للتوصية", priority: "عالية", assignedToMe: true, assignedDate: "1 أغسطس 2026", submittedDate: "28 يوليو 2026", lastUpdated: "اليوم، 10:15 ص" },
  { id: "IDEA-1051", title: "منصة لمشاركة المعرفة المؤسسية", innovator: "نورة القحطاني", innovatorType: "فرد", category: "إدارة المعرفة", status: "تحتاج استكمال", priority: "متوسطة", assignedToMe: true, assignedDate: "30 يوليو 2026", submittedDate: "27 يوليو 2026", lastUpdated: "أمس، 3:40 م" },
  { id: "IDEA-1047", title: "حل ذكي لتحسين تجربة الموظفين", innovator: "فريق تجربة", innovatorType: "فريق ابتكار", category: "تجربة الموظف", status: "قيد التقييم", priority: "منخفضة", assignedToMe: true, assignedDate: "28 يوليو 2026", submittedDate: "24 يوليو 2026", lastUpdated: "أمس، 11:20 ص" },
  { id: "IDEA-1042", title: "نظام تنبؤ بالأعطال التشغيلية", innovator: "سلمان الدوسري", innovatorType: "فرد", category: "الكفاءة التشغيلية", status: "تم رفع التوصية", priority: "عالية", assignedToMe: true, assignedDate: "25 يوليو 2026", submittedDate: "20 يوليو 2026", lastUpdated: "4 أغسطس 2026" },
  { id: "IDEA-1038", title: "بوابة موحدة لرحلة الموظف", innovator: "ليان الغامدي", innovatorType: "فرد", category: "تجربة الموظف", status: "بانتظار المراجعة", priority: "متوسطة", assignedToMe: true, assignedDate: "23 يوليو 2026", submittedDate: "22 يوليو 2026", lastUpdated: "3 أغسطس 2026" },
  { id: "IDEA-1031", title: "أتمتة فرز الطلبات الداخلية", innovator: "فريق كفاءة", innovatorType: "فريق ابتكار", category: "التحول الرقمي", status: "قيد التقييم", priority: "منخفضة", assignedToMe: true, assignedDate: "19 يوليو 2026", submittedDate: "17 يوليو 2026", lastUpdated: "2 أغسطس 2026" },
  { id: "IDEA-1026", title: "مؤشر استباقي لقياس رضا المستفيد", innovator: "هدى المطيري", innovatorType: "فرد", category: "تحليل البيانات", status: "معادة للمراجعة", priority: "عالية", assignedToMe: true, assignedDate: "15 يوليو 2026", submittedDate: "12 يوليو 2026", lastUpdated: "31 يوليو 2026" },
  { id: "IDEA-1019", title: "مبادرة المكاتب الخالية من الورق", innovator: "محمد الزهراني", innovatorType: "فرد", category: "الاستدامة", status: "تم رفع التوصية", priority: "متوسطة", assignedToMe: true, assignedDate: "10 يوليو 2026", submittedDate: "8 يوليو 2026", lastUpdated: "29 يوليو 2026" }
];

export const ideaDetailsMock = {
  id: "IDEA-1058",
  title: "منصة ذكية لإدارة الطاقة في المباني",
  status: "بانتظار المراجعة",
  priority: "عالية",
  submissionDate: "4 أغسطس 2026",
  assignedDate: "5 أغسطس 2026",
  summary: "منصة تعتمد على بيانات الاستهلاك اللحظية لمراقبة الطاقة في المباني الحكومية وتقديم توصيات آلية لخفض الاستهلاك والتكاليف.",
  problem: "ارتفاع استهلاك الطاقة وصعوبة اكتشاف مصادر الهدر بصورة مبكرة، مع اعتماد فرق التشغيل على تقارير دورية لا توفر رؤية لحظية.",
  solution: "ربط العدادات وأنظمة إدارة المباني في لوحة موحدة تستخدم التحليلات لاكتشاف الأنماط غير الطبيعية وإرسال تنبيهات وتوصيات تشغيلية.",
  impact: "خفض استهلاك الطاقة المتوقع بنسبة 15%، وتحسين كفاءة التشغيل، ودعم مستهدفات الاستدامة وخفض الانبعاثات.",
  category: "الاستدامة والتحول الرقمي",
  strategicGoals: ["رفع الكفاءة التشغيلية", "تعزيز الاستدامة البيئية", "تسريع التحول الرقمي"],
  scope: "تجربة أولية في ثلاثة مبانٍ إدارية ثم التوسع التدريجي.",
  beneficiary: "إدارة المرافق، فرق التشغيل، وإدارة الاستدامة.",
  attachments: ["دراسة الجدوى الأولية.pdf", "تصور المنصة والواجهات.pdf", "بيانات استهلاك نموذجية.xlsx"],
  innovator: { name: "أحمد خالد العتيبي", type: "داخلي", email: "ahmad.alotaibi@manarah.sa", organization: "إدارة التحول الرقمي", previousIdeas: 6, approvedIdeas: 2, resultingProjects: 1 },
  statusHistory: [
    { title: "تم تقديم الفكرة", date: "4 أغسطس 2026، 9:20 ص" },
    { title: "اجتازت المراجعة الأولية", date: "4 أغسطس 2026، 1:10 م" },
    { title: "تم إسناد الفكرة لمسؤول الابتكار", date: "5 أغسطس 2026، 8:45 ص" }
  ],
  requests: [
    { id: 1, title: "تفاصيل بيانات الاستهلاك", description: "تزويدنا بعينة من بيانات استهلاك الطاقة وآلية جمعها الحالية.", documents: "ملف بيانات لآخر ثلاثة أشهر، وصف مصادر البيانات", requestDate: "5 أغسطس 2026", dueDate: "9 أغسطس 2026", priority: "عالية", status: "تم الرد", response: "تم إرفاق عينة البيانات ووصف مصادرها وآلية تحديثها.", responseAttachments: ["عينة استهلاك الطاقة.xlsx", "وصف مصادر البيانات.pdf"] }
  ],
  timeline: ["تم تقديم الفكرة", "تم إسناد الفكرة لمسؤول الابتكار", "بدأت المراجعة", "تم طلب استكمال", "رد المبتكر", "بدأ التقييم"]
} as const;

export const evaluations: EvaluationListItem[] = [
  { id: "IDEA-1062", title: "نظام تحليل استباقي لمخاطر السلامة", innovator: "عبدالله الشمري", category: "السلامة", status: "مسودة", priority: "عالية", averageScore: null, completion: 25, lastUpdated: "اليوم، 11:20 ص", updatePeriod: "today", dueDate: "اليوم، 4:00 م", urgent: true },
  { id: "IDEA-1058", title: "منصة ذكية لإدارة الطاقة في المباني", innovator: "أحمد العتيبي", category: "الاستدامة", status: "قيد التقييم", priority: "عالية", averageScore: 3.5, completion: 50, lastUpdated: "اليوم، 9:45 ص", updatePeriod: "today", dueDate: "6 أغسطس 2026", urgent: true },
  { id: "IDEA-1054", title: "مساعد رقمي لخدمة المستفيدين", innovator: "ريم الحربي", category: "الخدمات الذكية", status: "جاهزة للتوصية", priority: "عالية", averageScore: 4.3, completion: 100, lastUpdated: "أمس، 3:10 م", updatePeriod: "week", dueDate: "7 أغسطس 2026", urgent: true },
  { id: "IDEA-1051", title: "منصة لمشاركة المعرفة المؤسسية", innovator: "نورة القحطاني", category: "إدارة المعرفة", status: "معادة للمراجعة", priority: "متوسطة", averageScore: 3.8, completion: 75, lastUpdated: "أمس، 12:30 م", updatePeriod: "week", dueDate: "8 أغسطس 2026", urgent: true },
  { id: "IDEA-1047", title: "حل ذكي لتحسين تجربة الموظفين", innovator: "فريق تجربة", category: "تجربة الموظف", status: "قيد التقييم", priority: "منخفضة", averageScore: 3.2, completion: 75, lastUpdated: "4 أغسطس 2026", updatePeriod: "week", dueDate: "10 أغسطس 2026", urgent: false },
  { id: "IDEA-1042", title: "نظام تنبؤ بالأعطال التشغيلية", innovator: "سلمان الدوسري", category: "الكفاءة التشغيلية", status: "تم رفع التوصية", priority: "عالية", averageScore: 4.5, completion: 100, lastUpdated: "3 أغسطس 2026", updatePeriod: "week", dueDate: "مكتمل", urgent: false },
  { id: "IDEA-1038", title: "بوابة موحدة لرحلة الموظف", innovator: "ليان الغامدي", category: "تجربة الموظف", status: "مسودة", priority: "متوسطة", averageScore: null, completion: 25, lastUpdated: "1 أغسطس 2026", updatePeriod: "week", dueDate: "12 أغسطس 2026", urgent: false },
  { id: "IDEA-1031", title: "أتمتة فرز الطلبات الداخلية", innovator: "فريق كفاءة", category: "التحول الرقمي", status: "جاهزة للتوصية", priority: "منخفضة", averageScore: 4.0, completion: 100, lastUpdated: "29 يوليو 2026", updatePeriod: "month", dueDate: "11 أغسطس 2026", urgent: false },
  { id: "IDEA-1026", title: "مؤشر استباقي لقياس رضا المستفيد", innovator: "هدى المطيري", category: "تحليل البيانات", status: "معادة للمراجعة", priority: "عالية", averageScore: 3.6, completion: 75, lastUpdated: "27 يوليو 2026", updatePeriod: "month", dueDate: "9 أغسطس 2026", urgent: true },
  { id: "IDEA-1019", title: "مبادرة المكاتب الخالية من الورق", innovator: "محمد الزهراني", category: "الاستدامة", status: "تم رفع التوصية", priority: "متوسطة", averageScore: 4.1, completion: 100, lastUpdated: "22 يوليو 2026", updatePeriod: "month", dueDate: "مكتمل", urgent: false }
];

export const projects: ProjectListItem[] = [
  { id: "PRJ-224", name: "مشروع إدارة الطاقة الذكية", ideaId: "IDEA-1058", ideaTitle: "منصة ذكية لإدارة الطاقة في المباني", manager: "م. خالد السبيعي", phase: "التصميم التفصيلي", status: "قيد التخطيط", priority: "عالية", completion: 20, openRequirements: 5, lastUpdate: "اليوم، 10:30 ص", updatePeriod: "today", action: "متابعة المتطلبات", attentionReason: "تجاوز موعد متطلب" },
  { id: "PRJ-219", name: "مشروع تقليل الهدر الغذائي", ideaId: "IDEA-1056", ideaTitle: "نظام لتقليل الهدر الغذائي", manager: "سارة الدوسري", phase: "التجربة الأولية", status: "قيد التنفيذ", priority: "متوسطة", completion: 55, openRequirements: 3, lastUpdate: "أمس، 2:15 م", updatePeriod: "week", action: "إضافة تحديث" },
  { id: "PRJ-215", name: "مشروع المساعد الرقمي للمستفيدين", ideaId: "IDEA-1054", ideaTitle: "مساعد رقمي لخدمة المستفيدين", manager: "م. فيصل القحطاني", phase: "تكامل الأنظمة", status: "متعثر", priority: "عالية", completion: 45, openRequirements: 7, lastUpdate: "22 يوليو 2026", updatePeriod: "older", action: "متابعة المتطلبات", attentionReason: "المشروع متعثر" },
  { id: "PRJ-208", name: "مشروع منصة المعرفة المؤسسية", ideaId: "IDEA-1051", ideaTitle: "منصة لمشاركة المعرفة المؤسسية", manager: "نورة الغامدي", phase: "إعداد المحتوى", status: "معلق", priority: "متوسطة", completion: 35, openRequirements: 4, lastUpdate: "18 يوليو 2026", updatePeriod: "older", action: "مراجعة الجدول الزمني", attentionReason: "لم تتم إضافة تحديث منذ 14 يومًا" },
  { id: "PRJ-202", name: "مشروع تحسين تجربة الموظف", ideaId: "IDEA-1047", ideaTitle: "حل ذكي لتحسين تجربة الموظفين", manager: "محمد الشهري", phase: "التطوير", status: "قيد التنفيذ", priority: "منخفضة", completion: 70, openRequirements: 2, lastUpdate: "3 أغسطس 2026", updatePeriod: "week", action: "عرض المشروع" },
  { id: "PRJ-197", name: "مشروع التنبؤ بالأعطال التشغيلية", ideaId: "IDEA-1042", ideaTitle: "نظام تنبؤ بالأعطال التشغيلية", manager: "م. هدى المطيري", phase: "الاختبار", status: "قيد التنفيذ", priority: "عالية", completion: 82, openRequirements: 2, lastUpdate: "2 أغسطس 2026", updatePeriod: "week", action: "إضافة تحديث", attentionReason: "الجدول الزمني يحتاج تحديثًا" },
  { id: "PRJ-188", name: "مشروع بوابة رحلة الموظف", ideaId: "IDEA-1038", ideaTitle: "بوابة موحدة لرحلة الموظف", manager: "عبدالعزيز الحربي", phase: "تحديد النطاق", status: "قيد التخطيط", priority: "متوسطة", completion: 15, openRequirements: 6, lastUpdate: "1 أغسطس 2026", updatePeriod: "week", action: "متابعة المتطلبات" },
  { id: "PRJ-176", name: "مشروع أتمتة الطلبات الداخلية", ideaId: "IDEA-1031", ideaTitle: "أتمتة فرز الطلبات الداخلية", manager: "ليان العتيبي", phase: "الإطلاق", status: "مكتمل", priority: "منخفضة", completion: 100, openRequirements: 0, lastUpdate: "28 يوليو 2026", updatePeriod: "older", action: "عرض المشروع" },
  { id: "PRJ-164", name: "مشروع مؤشر رضا المستفيد", ideaId: "IDEA-1026", ideaTitle: "مؤشر استباقي لقياس رضا المستفيد", manager: "سلمان الزهراني", phase: "جمع البيانات", status: "متعثر", priority: "عالية", completion: 30, openRequirements: 8, lastUpdate: "16 يوليو 2026", updatePeriod: "older", action: "مراجعة الجدول الزمني", attentionReason: "تجاوز موعد متطلب" },
  { id: "PRJ-151", name: "مشروع المكاتب الخالية من الورق", ideaId: "IDEA-1019", ideaTitle: "مبادرة المكاتب الخالية من الورق", manager: "ريم الشمري", phase: "قياس الأثر", status: "مكتمل", priority: "متوسطة", completion: 100, openRequirements: 0, lastUpdate: "10 يوليو 2026", updatePeriod: "older", action: "عرض المشروع" }
];

export const projectDetailsMock = {
  summary: "تطبيق منصة موحدة لمراقبة استهلاك الطاقة في المباني الإدارية وتحليل الأنماط التشغيلية وإصدار تنبيهات وتوصيات آلية لتحسين الكفاءة.",
  businessObjective: "خفض تكاليف الطاقة وتحسين كفاءة تشغيل المرافق مع توفير بيانات دقيقة تدعم القرارات والاستدامة المؤسسية.",
  expectedOutcomes: ["خفض استهلاك الطاقة بنسبة 15%", "تقليل وقت اكتشاف الهدر", "رفع جودة التقارير التشغيلية", "إنشاء خط أساس موحد للاستهلاك"],
  strategicObjective: "رفع الكفاءة التشغيلية وتعزيز الاستدامة البيئية",
  owner: "إدارة المرافق والاستدامة",
  stakeholders: ["إدارة التحول الرقمي", "إدارة المرافق", "إدارة الأمن السيبراني", "مزود أنظمة المباني"],
  startDate: "10 أغسطس 2026",
  expectedCompletion: "15 فبراير 2027",
  budget: "780,000 ر.س",
  requirements: [
    { id: 1, title: "اعتماد مصادر بيانات العدادات", description: "حصر العدادات المتاحة وتوثيق آلية الوصول إلى قراءاتها وتواتر التحديث.", priority: "عالية", status: "قيد التنفيذ", dueDate: "12 أغسطس 2026", assignee: "م. خالد السبيعي" },
    { id: 2, title: "مراجعة ضوابط الأمن السيبراني", description: "تقييم ربط أنظمة المباني واعتماد ضوابط التكامل وحماية البيانات.", priority: "عالية", status: "مفتوح", dueDate: "18 أغسطس 2026", assignee: "فريق الأمن السيبراني" },
    { id: 3, title: "تحديد مؤشرات قياس الأثر", description: "تعريف خط الأساس ومؤشرات خفض الاستهلاك والتكلفة وجودة التنبيهات.", priority: "متوسطة", status: "مكتمل", dueDate: "8 أغسطس 2026", assignee: "سارة الدوسري" },
    { id: 4, title: "توفير بيئة الاختبار", description: "تهيئة بيئة تجريبية وربطها ببيانات مبنى إداري واحد.", priority: "متوسطة", status: "متعثر", dueDate: "20 أغسطس 2026", assignee: "فريق البنية التحتية" }
  ],
  milestones: [
    { id: 1, title: "إنشاء المشروع", date: "6 أغسطس 2026", status: "مكتمل" },
    { id: 2, title: "الاجتماع الافتتاحي", date: "10 أغسطس 2026", status: "مكتمل" },
    { id: 3, title: "التخطيط", date: "25 أغسطس 2026", status: "قيد التنفيذ" },
    { id: 4, title: "التنفيذ", date: "30 نوفمبر 2026", status: "لم يبدأ" },
    { id: 5, title: "التجربة الأولية", date: "15 يناير 2027", status: "لم يبدأ" },
    { id: 6, title: "الإطلاق", date: "15 فبراير 2027", status: "لم يبدأ" }
  ],
  updates: [
    { id: 1, date: "6 أغسطس 2026، 10:30 ص", author: "م. خالد السبيعي", text: "تم الانتهاء من حصر العدادات في المبنى الأول، ويجري التحقق من جودة البيانات المتاحة.", attachment: "تقرير حصر العدادات.pdf" },
    { id: 2, date: "3 أغسطس 2026، 2:15 م", author: "سارة الأحمد", text: "تم الاتفاق على مؤشرات قياس الأثر وخط الأساس الذي سيستخدم في المرحلة التجريبية.", attachment: null },
    { id: 3, date: "30 يوليو 2026، 11:00 ص", author: "فريق المشروع", text: "عُقد الاجتماع التحضيري وتم توزيع الأدوار ومسؤوليات فرق العمل.", attachment: "محضر الاجتماع.docx" }
  ],
  attachments: [
    { id: 1, name: "دراسة الجدوى.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "سارة الأحمد", date: "6 أغسطس 2026" },
    { id: 2, name: "الجدول الزمني.xlsx", type: "XLSX", size: "860 KB", uploadedBy: "م. خالد السبيعي", date: "5 أغسطس 2026" },
    { id: 3, name: "العرض التعريفي.pptx", type: "PPTX", size: "5.1 MB", uploadedBy: "فريق المشروع", date: "3 أغسطس 2026" }
  ],
  activity: [
    { id: 1, title: "تم تحديث حالة متطلب", detail: "تحديد مؤشرات قياس الأثر — مكتمل", actor: "سارة الأحمد", date: "6 أغسطس 2026، 11:05 ص" },
    { id: 2, title: "تم رفع مرفق", detail: "دراسة الجدوى.pdf", actor: "سارة الأحمد", date: "6 أغسطس 2026، 9:40 ص" },
    { id: 3, title: "تم تعديل الجدول الزمني", detail: "تحديث تاريخ مرحلة التجربة الأولية", actor: "م. خالد السبيعي", date: "5 أغسطس 2026، 3:25 م" },
    { id: 4, title: "تم إسناد المشروع", detail: "إسناد متابعة المشروع لمسؤول الابتكار", actor: "مسؤول الجهة", date: "5 أغسطس 2026، 9:00 ص" },
    { id: 5, title: "تم تغيير حالة المشروع", detail: "من جديد إلى قيد التخطيط", actor: "م. خالد السبيعي", date: "4 أغسطس 2026، 1:10 م" }
  ]
} as const;
