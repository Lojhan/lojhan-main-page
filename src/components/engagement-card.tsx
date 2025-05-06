import { Check, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

type EngagementCardProps = {
  title: string;
  price: string;
  modifier: string;
  description: string;
  features: readonly string[];
  timeline: string;
  getStarted: string;
};

export function EngagementCard({
  title,
  price,
  modifier,
  description,
  features,
  timeline,
  getStarted,
}: EngagementCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4 flex items-baseline text-5xl font-bold">
          {price}
          <span className="ml-1 text-xl font-normal text-muted-foreground">
            {modifier}
          </span>
        </div>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4">
        <ul className=" gap-2 text-sm flex flex-col">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="mr-2 h-4 w-4 text-green-500" />{" "}
              <span>{feature}</span>
            </li>
          ))}
          {timeline?.length > 0 ? (
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{timeline}</span>
            </li>
          ) : null}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/contact">{getStarted}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
