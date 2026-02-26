import { api } from './api';

export type AiChatRecord = {
  id: string;
  probable_causes?: string[];
  probableCauses?: string[];
  severity?: string;
  recommendation?: string;
  disclaimer?: string;
  createdAt?: string;
};

export const formatAiResponse = (chat: AiChatRecord) => {
  const probableCauses = (chat.probable_causes || chat.probableCauses || []) as string[];
  const { recommendation = '', disclaimer = '' } = chat as any;

  let response = `**Probable Causes:**\n${probableCauses
    .map((cause) => `• ${cause}`)
    .join('\n')}\n\n`;
  response += `**Recommendation:**\n${recommendation}\n\n`;
  response += `**Disclaimer:**\n${disclaimer}`;

  return response;
};

export async function loadAiChatHistory() {
  const res = await api.get(`/ai-chat/history`);
  return res.data;
}

export async function sendAiMessage(symptoms: string, language = 'en', timeout = 15000) {
  const res = await api.post(
    `/ai-chat/process`,
    { symptoms, language },
    { timeout }
  );
  return res.data;
}
