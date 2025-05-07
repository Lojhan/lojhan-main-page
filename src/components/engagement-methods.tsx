import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EngagementCard } from "./engagement-card";
import { Container } from "./ui/container";
import { SectionIntro } from "./section-intro";

type EngagementSectionProps = {
  title: string;
  description: string;
  getStarted: string;
  id?: string;
  tabs: readonly {
    title: string;
    items: readonly {
      isMostPopular: boolean;
      title: string;
      description: string;
      price: string;
      modifier: string;
      features: readonly string[];
      timeline: string;
    }[];
  }[];
};

export function EngagementSection({
  id = "engagement",
  ...props
}: EngagementSectionProps) {
  const tabs = props.tabs.map((tab) => tab.title);
  return (
    <Container className="bg-muted" id={id}>
      <SectionIntro title={props.title} subtitle={props.description} />
      <Tabs defaultValue={tabs[0]} className="mx-auto max-w-7xl py-12">
        <div className="max-sm:sticky relative max-sm:top-16 z-40 py-2 bg-muted">
          <TabsList className={`grid gap-2 grid-cols-${tabs.length}`}>
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab}
                className="cursor-pointer hover:bg-muted-foreground hover:text-foreground"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {props.tabs.map((tab, index) => (
          <TabsContent
            key={index}
            value={tab.title}
            className={`grid gap-8
                sm:grid-cols-${Math.max(1, tab.items.length - 2)}
                md:grid-cols-${Math.max(1, tab.items.length - 1)}
                lg:grid-cols-${Math.max(1, tab.items.length)}`}
          >
            {
                tab.items.length == 0 ? 
                <div className="col-span-full text-center">
                  <p className="text-muted-foreground h-[300px] flex items-center justify-center">
                    No items available in this category...Yet!
                  </p>
                </div> : null
            }
            {tab.items.map((item, itemIndex) => (
              <EngagementCard
                key={itemIndex}
                {...item}
                getStarted={props.getStarted}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
}
