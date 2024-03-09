import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed. Use intelligent, simple, and understandable language. Be concise. You are a financial analyst and was asked to prepare a brief note on a matter. Responses should be based on the facts, data, numbers only from the above supplied material. Check your responses twice before answering. Never hallucinate. Use a narrative style.`;

type DemoBot = Omit<Bot, "session">;

export const DEMO_BOTS: DemoBot[] = [
  {
    id: "1",
    avatar: "1f916",
    name: "GPT-4 Vision Preview",
    botHello: "Hello! How can I assist you today?",
    context: [],
    modelConfig: {
      model: "gpt-4-vision-preview",
      temperature: 0.3,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    hideContext: false,
  },
  {
    id: "2",
    avatar: "1f916",
    name: "My Documents",
    botHello: "Hello! How can I assist you today?",
    context: [],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.5,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    hideContext: false,
  },
  {
    id: "3",
    avatar: "1f454",
    name: "Apple Watch Genius",
    botHello: "Hello! How can I help you with Apple Watches?",
    context: [
      {
        role: "system",
        content: TEMPLATE("Apple Genius specialized in Apple Watches"),
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "watchos",
    hideContext: false,
  },
];

export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
