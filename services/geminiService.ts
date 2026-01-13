
export class AIError extends Error {
  constructor(public message: string, public type: 'network' | 'auth' | 'quota' | 'unknown' = 'unknown') {
    super(message);
    this.name = 'AIError';
  }
}

function resolveMistralApiKey(): string | undefined {
  let key: string | undefined;

  const env = (import.meta as any).env;
  if (env) {
    key = env.VITE_MISTRAL_API_KEY ?? env.MISTRAL_API_KEY;
  }

  return key ?? process.env?.VITE_MISTRAL_API_KEY ?? process.env?.MISTRAL_API_KEY;
}

const MISTRAL_API_KEY = resolveMistralApiKey();

function createHeaders() {
  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'PLACEHOLDER_API_KEY') {
    throw new AIError(
      "API Key is missing. Please set VITE_MISTRAL_API_KEY in your environment.",
      'auth'
    );
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MISTRAL_API_KEY}`
  };
}

function handleAIError(error: any): AIError {
  console.error("Mistral API Error Detail:", error);
  
  const status = error?.status || error?.response?.status;
  const message = error?.message?.toLowerCase() || "";
  const errorMessage = error?.response?.data?.message || error?.message || "";

  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'PLACEHOLDER_API_KEY') {
    return new AIError("API Key is missing. Please configure your environment.", 'auth');
  }

  if (message.includes("network") || message.includes("fetch") || message.includes("failed to fetch")) {
    return new AIError("Network connection lost. Please check your internet and try again.", 'network');
  }

  if (status === 401 || status === 403 || errorMessage.toLowerCase().includes("unauthorized") || errorMessage.toLowerCase().includes("invalid api key")) {
    return new AIError("Authentication failed. The API key might be invalid or expired.", 'auth');
  }

  if (status === 429 || errorMessage.toLowerCase().includes("too many requests") || errorMessage.toLowerCase().includes("rate limit") || errorMessage.toLowerCase().includes("quota")) {
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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function* streamResponse(response: Response): AsyncGenerator<string, void, unknown> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const status = error?.status || error?.response?.status;
      const errorMessage = error?.response?.data?.message || error?.message || "";
      const message = errorMessage.toLowerCase();

      if (status === 429 || message.includes("too many requests") || message.includes("rate limit") || message.includes("quota")) {
        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt);
          console.log(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
          await sleep(delay);
          continue;
        }
      }
      throw error;
    }
  }

  throw lastError;
}

export async function getAlgorithmDeepDive(algorithmName: string, currentData: any[]) {
  return retryWithBackoff(async () => {
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

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: true,
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw { status: response.status, response: { data: error } };
    }

    return streamResponse(response);
  }).catch((error) => {
    if (error instanceof AIError) throw error;
    throw handleAIError(error);
  });
}

export async function chatWithAIStream(
  algorithmName: string, 
  currentData: any[],
  userMessage: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[]
) {
  return retryWithBackoff(async () => {
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

    const messages: any[] = [
      { role: 'system', content: systemInstruction }
    ];

    if (history.length > 0) {
      history.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.parts[0]?.text || ''
        });
      });
    }

    messages.push({
      role: 'user',
      content: userMessage
    });

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages,
        stream: true,
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw { status: response.status, response: { data: error } };
    }

    return streamResponse(response);
  }).catch((error) => {
    if (error instanceof AIError) throw error;
    throw handleAIError(error);
  });
}
