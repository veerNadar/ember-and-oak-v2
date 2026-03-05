"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, Tag, MessageSquare, Loader2 } from "lucide-react";

const SUBJECTS = [
    "General Inquiry",
    "Event Booking",
    "Feedback",
    "Press",
];

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const INITIAL: FormData = { name: "", email: "", subject: "", message: "" };

function validate(form: FormData): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email address.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    else if (form.message.trim().length < 10)
        e.message = "Message must be at least 10 characters.";
    return e;
}

function FieldWrapper({
    label, required = false, error, icon: Icon, children,
}: {
    label: string; required?: boolean; error?: string;
    icon: React.ElementType; children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-inter text-xs font-semibold text-cream/60 uppercase tracking-widest">
                <Icon size={12} className="text-ember" />
                {label}
                {required && <span className="text-ember ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="font-inter text-xs text-red-400">{error}</p>}
        </div>
    );
}

const inputCls = (error?: string) =>
    [
        "w-full bg-charcoal border rounded-sm px-4 py-2.5",
        "font-inter text-sm text-cream placeholder-cream/25",
        "transition-colors duration-200 outline-none",
        "focus:border-ember focus:ring-1 focus:ring-ember/30",
        error ? "border-red-500/60" : "border-ash/30 hover:border-ash/60",
    ].join(" ");

export default function ContactForm() {
    const [form, setForm] = useState<FormData>(INITIAL);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const set = (field: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
        };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const fieldErrors = validate(form);
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            toast.error("Please fix the errors before submitting.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.error ?? "Something went wrong.");
            }
            toast.success("Message sent! We'll be in touch within 24 hours.", { duration: 6000 });
            setForm(INITIAL);
            setErrors({});
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Failed to send. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldWrapper label="Your Name" required icon={User} error={errors.name}>
                    <input type="text" value={form.name} onChange={set("name")}
                        placeholder="Jane Smith" autoComplete="name" className={inputCls(errors.name)} />
                </FieldWrapper>
                <FieldWrapper label="Email Address" required icon={Mail} error={errors.email}>
                    <input type="email" value={form.email} onChange={set("email")}
                        placeholder="jane@example.com" autoComplete="email" className={inputCls(errors.email)} />
                </FieldWrapper>
            </div>

            <FieldWrapper label="Subject" required icon={Tag} error={errors.subject}>
                <select value={form.subject} onChange={set("subject")} className={inputCls(errors.subject)}>
                    <option value="" disabled>Select a subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
            </FieldWrapper>

            <FieldWrapper label="Message" required icon={MessageSquare} error={errors.message}>
                <textarea value={form.message} onChange={set("message")} rows={5}
                    placeholder="Tell us how we can help…" className={inputCls(errors.message) + " resize-none"} />
            </FieldWrapper>

            <button
                type="submit"
                disabled={loading}
                className={[
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-sm",
                    "font-inter text-sm font-bold tracking-wider uppercase transition-all duration-200",
                    loading
                        ? "bg-ash text-cream/50 cursor-not-allowed"
                        : "bg-ember hover:bg-ember-light active:bg-ember-dark text-cream shadow-lg shadow-ember/25 hover:shadow-ember/40 hover:shadow-xl",
                ].join(" ")}
            >
                {loading ? <><Loader2 size={16} className="animate-spin" />Sending…</> : "Send Message"}
            </button>

            <p className="font-inter text-xs text-center text-cream/30">
                Fields marked <span className="text-ember">*</span> are required.{" "}
                We respond within 24 hours.
            </p>
        </form>
    );
}
