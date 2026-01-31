import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { Navbar } from "@/components/web/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {children}
        </main>
        <Toaster closeButton/>
      </ConvexClientProvider>
    </ThemeProvider>
  );
}