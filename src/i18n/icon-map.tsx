import {
  Code,
  Database,
  FileCode2,
  Globe,
  Layers,
  Lightbulb,
  Settings,
  Users,
} from "lucide-react";

export const iconMap = {
  globe: () => <Globe className="h-8 w-8" />,
  database: () => <Database className="h-8 w-8" />,
  layers: () => <Layers className="h-8 w-8" />,
  users: () => <Users className="h-8 w-8" />,
  lightbulb: () => <Lightbulb className="h-8 w-8" />,
  code: () => <Code className="h-8 w-8" />,
  settings: () => <Settings className="h-8 w-8" />,
  filecode: () => <FileCode2 className="h-8 w-8" />,
};
