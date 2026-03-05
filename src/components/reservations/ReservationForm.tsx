"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, Clock, Users, User, Phone, Mail, MessageSquare, Loader2 } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────
const TIME_SLOTS = [
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
];

const PARTY_SIZES = Array.from({ length: 10 }, (_, i) => i + 1);

// Min date: today. Max date: 60 days from now.
function getDateBounds() {
    const today = new Date();
    const max = new Date();
    max.setDate(today.getDate() + 60);
    const fmt = (d: Date) => d.toISOString().split("T")[0];
    return { min: fmt(today), max: fmt(max) };
}

// ── Types ──────────────────────────────────────────────────────────────────
interface FormData {
    customer_name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    party_size: string;
    notes: string;
}

interface FormErrors {
    customer_name?: string;
    phone?: string;
    date?: string;
    time?: string;
    party_size?: string;
}

const INITIAL: FormData = {
    customer_name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    party_size: "",
    notes: "",
};

// ── Validation ─────────────────────────────────────────────────────────────
function validate(form: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!form.customer_name.trim()) {
        errors.customer_name = "Full name is required.";
    }

    if (!form.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^[\d\s\-()+]{7,20}$/.test(form.phone.trim())) {
        errors.phone = "Enter a valid phone number.";
    }

    if (!form.date) {
        errors.date = "Please select a date.";
    } else {
        const { min, max } = getDateBounds();
        if (form.date < min) errors.date = "Date cannot be in the past.";
        if (form.date > max) errors.date = "Date must be within 60 days.";
    }

    if (!form.time) {
        errors.time = "Please select a time slot.";
    }

    if (!form.party_size) {
        errors.party_size = "Party size is required.";
    }

    return errors;
}

// ── Shared field wrapper ───────────────────────────────────────────────────
function FieldWrapper({
    label, required = false, error, icon: Icon, children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-inter text-xs font-semibold text-cream/60 uppercase tracking-widest">
                <Icon size={12} className="text-ember" />
                {label}
                {required && <span className="text-ember ml-0.5">*</span>}
            </label>
            {children}
            {error && (
                <p className="font-inter text-xs text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
}

// ── Shared input class ─────────────────────────────────────────────────────
const inputCls = (error?: string) =>
    [
        "w-full bg-charcoal border rounded-sm px-4 py-2.5",
        "font-inter text-sm text-cream placeholder-cream/25",
        "transition-colors duration-200 outline-none",
        "focus:border-ember focus:ring-1 focus:ring-ember/30",
        error ? "border-red-500/60" : "border-ash/30 hover:border-ash/60",
    ].join(" ");

// ── Component ──────────────────────────────────────────────────────────────
export default function ReservationForm() {
    const [form, setForm] = useState<FormData>(INITIAL);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const { min, max } = getDateBounds();

    const set = (field: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            // Clear individual field error on change
            if (errors[field as keyof FormErrors]) {
                setErrors((prev) => ({ ...prev, [field]: undefined }));
            }
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
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    party_size: Number(form.party_size),
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.error ?? "Something went wrong.");
            }

            toast.success("Your reservation request has been received! We'll confirm within 2 hours.", { duration: 6000 });
            setForm(INITIAL);
            setErrors({});
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to submit. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Row: Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldWrapper label="Full Name" required icon={User} error={errors.customer_name}>
                    <input
                        type="text"
                        value={form.customer_name}
                        onChange={set("customer_name")}
                        placeholder="Jane Smith"
                        autoComplete="name"
                        className={inputCls(errors.customer_name)}
                    />
                </FieldWrapper>

                <FieldWrapper label="Phone Number" required icon={Phone} error={errors.phone}>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="(512) 000-0000"
                        autoComplete="tel"
                        className={inputCls(errors.phone)}
                    />
                </FieldWrapper>
            </div>

            {/* Email */}
            <FieldWrapper label="Email Address" icon={Mail}>
                <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@example.com (optional)"
                    autoComplete="email"
                    className={inputCls()}
                />
            </FieldWrapper>

            {/* Row: Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldWrapper label="Date" required icon={CalendarDays} error={errors.date}>
                    <input
                        type="date"
                        value={form.date}
                        onChange={set("date")}
                        min={min}
                        max={max}
                        className={inputCls(errors.date) + " [color-scheme:dark]"}
                    />
                </FieldWrapper>

                <FieldWrapper label="Time" required icon={Clock} error={errors.time}>
                    <select
                        value={form.time}
                        onChange={set("time")}
                        className={inputCls(errors.time)}
                    >
                        <option value="" disabled>Select a time</option>
                        {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </FieldWrapper>
            </div>

            {/* Party size */}
            <FieldWrapper label="Party Size" required icon={Users} error={errors.party_size}>
                <select
                    value={form.party_size}
                    onChange={set("party_size")}
                    className={inputCls(errors.party_size)}
                >
                    <option value="" disabled>How many guests?</option>
                    {PARTY_SIZES.map((n) => (
                        <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                        </option>
                    ))}
                </select>
            </FieldWrapper>

            {/* Notes */}
            <FieldWrapper label="Special Requests" icon={MessageSquare}>
                <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={4}
                    placeholder="Dietary restrictions, celebrations, seating preferences… (optional)"
                    className={inputCls() + " resize-none"}
                />
            </FieldWrapper>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={[
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-sm",
                    "font-inter text-sm font-bold tracking-wider uppercase",
                    "transition-all duration-200",
                    loading
                        ? "bg-ash text-cream/50 cursor-not-allowed"
                        : "bg-ember hover:bg-ember-light active:bg-ember-dark text-cream shadow-lg shadow-ember/25 hover:shadow-ember/40 hover:shadow-xl",
                ].join(" ")}
            >
                {loading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting…
                    </>
                ) : (
                    "Request Reservation"
                )}
            </button>

            <p className="font-inter text-xs text-center text-cream/30">
                Fields marked <span className="text-ember">*</span> are required.
                We&apos;ll send a confirmation to your email if provided.
            </p>
        </form>
    );
}
