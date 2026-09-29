'use client';

import { useActionState } from 'react';
import { loginAction } from '@/actions/cms';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      const result = await loginAction(formData);
      return result || null;
    },
    null
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-2xl p-8 shadow-xl space-y-6">
        {/* Brand */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            ARK Portfolio CMS
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Restricted administrative access for Arik Riko Prasetya.
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#F87171] text-xs">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue="arikrikoprasetya@gmail.com"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full tap-target mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <span>{isPending ? 'Verifying Credentials...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#27272A] text-center">
          <p className="text-[11px] text-[#71717A]">
            Single-owner authenticated portal with secure local cookie session.
          </p>
        </div>
      </div>
    </div>
  );
}
