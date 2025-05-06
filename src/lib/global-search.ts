import { getContentRaw } from "./filesystem";

export type LinkCommand = {
  name: { "pt-BR": string; "en-US": string };
  kind: "link";
  value: string;
};

export type GroupCommand = {
  name: { "pt-BR": string; "en-US": string };
  kind: "group";
  value: Command[];
};

export type Command = LinkCommand | GroupCommand;

const commands = [
  {
    name: { "pt-BR": "Sugestões", "en-US": "Suggestions" },
    kind: "group",
    value: [
      {
        name: { "pt-BR": "Início", "en-US": "Home" },
        kind: "link",
        value: "/",
      },
      {
        name: { "pt-BR": "Blog", "en-US": "Blog" },
        kind: "link",
        value: "https://blog.lojhan.com",
      },
      {
        name: { "pt-BR": "Mentoria", "en-US": "Mentorship" },
        kind: "link",
        value: "/mentorship",
      },
      {
        name: { "pt-BR": "Consultoria", "en-US": "Consulting" },
        kind: "link",
        value: "/consulting",
      },
      {
        name: { "pt-BR": "Contato", "en-US": "Contact" },
        kind: "link",
        value: "/contact",
      },
    ],
  },
  {
    name: { "pt-BR": "Mentoria - Sobre", "en-US": "Mentorship - About" },
    kind: "link",
    value: "/mentorship#about",
  },
] as unknown as Command[];

export async function getAllCommands(filter: string) {
  const filteredCommands = commands.filter((command) => {
    if (command.kind === "link") {
      return (
        command.name["pt-BR"].toLowerCase().includes(filter.toLowerCase()) ||
        command.name["en-US"].toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return command.value.some(
        (subCommand) =>
          subCommand.name["pt-BR"]
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
          subCommand.name["en-US"].toLowerCase().includes(filter.toLowerCase())
      );
    }
  });

  const content = await getContentRaw(filter);

  const contentCommands = content.map((file) => {
    return {
      name: { "pt-BR": file, "en-US": file },
      kind: "link",
      value: `/content/${file}`,
    };
  });

  return [
    ...filteredCommands,
    {
      name: { "pt-BR": "Conteúdo", "en-US": "Content" },
      kind: "group",
      value: contentCommands,
    },
  ] as Command[];
}
