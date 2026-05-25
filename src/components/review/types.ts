export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  code?: string;
  attachment?: { type: "image"; name: string };
  timestamp: number;
};

