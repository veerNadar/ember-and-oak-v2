import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";
import ReservationsTable from "@/components/admin/ReservationsTable";

// Force this page to always be dynamically rendered — never statically cached.
export const dynamic = "force-dynamic";

async function fetchAllReservations(): Promise<Reservation[]> {
    // Opt out of Next.js data cache for this specific fetch.
    noStore();

    const { data, error } = await supabaseAdmin
        .from("reservations")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true });

    if (error) {
        console.error("[admin/reservations] fetch error:", error.message, error);
        return [];
    }

    console.log(`[admin/reservations] fetched ${data?.length ?? 0} rows`);
    return (data as Reservation[]) ?? [];
}

export default async function AdminReservationsPage() {
    const reservations = await fetchAllReservations();
    return <ReservationsTable initialData={reservations} />;
}
