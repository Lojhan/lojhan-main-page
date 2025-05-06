import ContentSidebar from "@/components/markdown-reader/content-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path =
    typeof window == "undefined"
      ? []
      : window.location.pathname.split("/").slice(3);

  return (
    <>
      {/* Mobile view - hidden on sm screens and above */}
      <div className="block w-full sm:hidden">
        <span className="text-primary">{path.join(" > ")}</span>
        <ScrollArea className="h-[calc(100vh-4rem-1px)]">{children}</ScrollArea>
      </div>

      {/* Desktop view - hidden on screens smaller than sm */}
      <div className="hidden w-full sm:block">
        <ResizablePanelGroup direction="horizontal" className="h-50">
          <ResizablePanel defaultSize={15} maxSize={50} minSize={5}>
            <ContentSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85}>
            <ScrollArea className="h-[calc(100vh-4rem-1px)]">
              {children}
              <span className="h-12"></span>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
