"use client";

import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { Button, Card, FormField } from "@/components";

export default function LoginPage() {
  const router = useRouter();

  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6" dir="rtl">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-700" />

    <div className="relative w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand-100 bg-white shadow-card">
          <span className="text-2xl font-black text-brand-800">م</span>
        </div>
        <p className="mt-4 text-2xl font-black tracking-wide text-brand-800">مـنـارة</p>
        <p className="mt-1 text-xs font-medium text-slate-500">MANARAH</p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">تسجيل الدخول</h1>
          <p className="mt-2 text-sm text-slate-500">منصة إدارة الابتكار</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); router.push("/innovation-specialist/dashboard"); }}>
          <FormField label="البريد الإلكتروني">
            <span className="relative block">
              <Mail className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="email" inputMode="email" autoComplete="email" placeholder="name@organization.sa" className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-11 pl-3 text-left text-sm placeholder:text-slate-400" dir="ltr" />
            </span>
          </FormField>

          <FormField label="كلمة المرور">
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="password" autoComplete="current-password" placeholder="••••••••" className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-11 pl-3 text-left text-sm placeholder:text-slate-400" dir="ltr" />
            </span>
          </FormField>

          <Button type="submit" className="w-full">تسجيل الدخول</Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-xs text-slate-400">واجهة تجريبية — لا تتطلب بيانات دخول حقيقية</p>
    </div>
  </main>;
}
