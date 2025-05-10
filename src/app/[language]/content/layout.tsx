import ContentSidebar from "@/components/markdown-reader/content-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getContentRaw } from "@/lib/filesystem";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  params: Promise<{
    language: string;
  }>;
  searchParams: {
    showSidebar: boolean;
  };
}>;

export default async function Layout({ children, params }: Props) {
  const { language } = await params;
  return (
    <>
      {/* Mobile view - hidden on sm screens and above */}
      <div className="w-full sm:hidden" id="scroll-target">
        {children}
      </div>

      {/* Desktop view - hidden on screens smaller than sm */}
      <div className="hidden w-full sm:block">
        <ResizablePanelGroup direction="horizontal" className="h-50">
          <ResizablePanel defaultSize={15} maxSize={50} minSize={5}>
            <ContentSidebar language={language} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85}>
            <ScrollArea className="h-[calc(100vh-4rem-1px)]">
              {children}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const [pt_BR_files, en_US_files] = await Promise.all([
    getContentRaw("", "pt-BR"),
    getContentRaw("", "en-US"),
  ]);

  const pt_BR_urls = pt_BR_files.map((file) => {
    return {
      path: file.split("/"),
      language: "pt-BR",
    };
  });

  const en_US_urls = en_US_files.map((file) => {
    return {
      path: file.split("/"),
      language: "en-US",
    };
  });

  const urls = [...pt_BR_urls, ...en_US_urls];

  return urls;
}
