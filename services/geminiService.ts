
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class AIError extends Error {
  constructor(public message: string, public type: 'network' | 'auth' | 'quota' | 'unknown' = 'unknown') {
    super(message);
    this.name = 'AIError';
  }
}

function resolveGeminiApiKey(): string | undefined {
  let key: string | undefined;

  if (typeof import.meta !== 'undefined') {
    const metaEnv = (import.meta as any)?.env;
    key = metaEnv?.VITE_GEMINI_API_KEY ?? metaEnv?.GEMINI_API_KEY;
  }

  return key ?? process.env?.VITE_GEMINI_API_KEY ?? process.env?.GEMINI_API_KEY;
}

const GEMINI_API_KEY = resolveGeminiApiKey();

function createClient() {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
    throw new AIError(
      "API Key is missing. Please set VITE_GEMINI_API_KEY in your environment.",
      'auth'
    );
  }
  return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

function handleAIError(error: any): AIError {
  console.error("Gemini API Error Detail:", error);
  
  const status = error?.status || error?.error?.status;
  const message = error?.message?.toLowerCase() || "";

  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
    return new AIError("API Key is missing. Please configure your environment.", 'auth');
  }

  if (message.includes("network") || message.includes("fetch") || message.includes("failed to execute 'fetch'")) {
    return new AIError("Network connection lost. Please check your internet and try again.", 'network');
  }

  if (status === 401 || status === 403 || message.includes("api key")) {
    return new AIError("Authentication failed. The API key might be invalid or expired.", 'auth');
  }

  if (status === 429 || message.includes("too many requests") || message.includes("quota")) {
    return new AIError("Rate limit exceeded. Please wait a moment before trying again.", 'quota');
  }

  return new AIError("Something went wrong with the AI service. Please try again later.", 'unknown');
}

/**
 * Format the current visualization data for the AI
 */
function formatCurrentState(algorithmName: string, data: any[]): string {
  const dataSummary = data.map(d => {
    if (d.neighbors) {
      return `Node ${d.value} (ID: ${d.id}, Color: ${d.color}, Neighbors: [${d.neighbors.map((n: any) => n.id).join(', ')}])`;
    }
    return `Value: ${d.value} (Color: ${d.color})`;
  }).join(', ');

  return `
CURRENT VISUALIZATION STATE:
- Algorithm: ${algorithmName}
- Current Data/Structure: [${dataSummary}]
- Legend Context: #e2e8f0 is Default, #3b82f6 is Active/Pivot, #f59e0b is Comparing, #10b981 is Sorted/Visited, #ef4444 is Target/Error.
`;
}

export async function getAlgorithmDeepDive(algorithmName: string, currentData: any[]) {
  try {
    const ai = createClient();
    const stateContext = formatCurrentState(algorithmName, currentData);
  
    const prompt = `Provide a professional, technical deep dive into the ${algorithmName} algorithm. 
    ${stateContext}

    Include:
    1. Detailed Time Complexity breakdown (Best, Average, Worst case).
    2. Space Complexity details.
    3. Real-world applications.
    4. Pros and Cons.
    5. A brief comment on the current data shown in the visualizer.
    Format the response in structured Markdown with clear headings and bullet points.`;

    // Using gemini-3-pro-preview for complex technical reasoning tasks
    return await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
  } catch (error) {
    if (error instanceof AIError) throw error;
    throw handleAIError(error);
  }
}

export async function chatWithAIStream(
  algorithmName: string, 
  currentData: any[],
  userMessage: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[]
) {
  try {
    const ai = createClient();
    const stateContext = formatCurrentState(algorithmName, currentData);
    
    const systemInstruction = `You are "AlgoTutor", an expert algorithms engineer. 
    You specialize in ${algorithmName}. Your goal is to help students visualize and understand the mechanics, performance, and nuances of algorithms.
    
    ${stateContext}

    IMPORTANT:
    - You are aware of the "Current Visualization State" provided above. If the user asks about specific colors (e.g., "Why is that node blue?"), use the state to explain what that color represents in the context of ${algorithmName}.
    - Be technically precise but accessible.
    - Use code snippets (JavaScript/Python) where helpful.
    - Use Markdown formatting extensively for readability.
    - If asked about something unrelated to DSA, politely guide the conversation back.`;

    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction,
      },
      history: history.length > 0 ? history : undefined,
    });

    return await chat.sendMessageStream({ message: userMessage });
  } catch (error) {
    if (error instanceof AIError) throw error;
    throw handleAIError(error);
  }
}
