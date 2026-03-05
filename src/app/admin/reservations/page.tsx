import { supabaseAdmin } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";
import ReservationsTable from "@/components/admin/ReservationsTable";

async function fetchAllReservations(): Promise<Reservation[]> {
    const { data, error } = await supabaseAdmin
        .from("reservations")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true });

    if (error) {
        console.error("[admin/reservations] fetch error:", error);
        return [];
    }
    return (data as Reservation[]) ?? [];
}

export default async function AdminReservationsPage() {
    const reservations = await fetchAllReservations();

    return <ReservationsTable initialData={reservations} />;
}
