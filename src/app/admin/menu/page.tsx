import { supabaseAdmin } from "@/lib/supabase";
import type { MenuItem } from "@/lib/types";
import MenuManager from "@/components/admin/MenuManager";

async function fetchAllMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabaseAdmin
        .from("menu_items")
        .select("*")
        .order("category")
        .order("name");

    if (error) {
        console.error("[admin/menu] fetch error:", error);
        return [];
    }
    return (data as MenuItem[]) ?? [];
}

export default async function AdminMenuPage() {
    const items = await fetchAllMenuItems();
    return <MenuManager initialItems={items} />;
}
