import { iconMap } from "@/i18n/icon-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type Expertise = {
  title: string;
  description: string;
  icon: string;
};

export function ExpertiseCard(expertise: Expertise) {
  const Icon = iconMap[expertise.icon as keyof typeof iconMap];
  return (
    <Card key={expertise.title}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon />
        <div className="grid gap-1">
          <CardTitle>{expertise.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{expertise.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
