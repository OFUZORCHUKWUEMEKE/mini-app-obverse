import BottomNav from "@/components/ui/BottomNav";
import { Toaster } from "sonner";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="bg-[#141414] w-full min-h-screen relative">
            <Toaster theme="dark" position="top-center" />
            <div className="w-[92%] max-w-[600px] mx-auto pb-44">
                {children}
            </div>
            <BottomNav />
        </main>
    );
}
