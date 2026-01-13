
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIImageProps {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
}

export const AIImage: React.FC<AIImageProps> = ({ prompt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      try {
        // Create fresh instance right before making the API call
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Upgrade to Pro for high-quality, reliable generation
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: `Generate a high-quality, professional, minimalist aesthetic image of: ${prompt}. Clean white background if applicable, 3D style, high contrast.` }],
          },
          config: {
            imageConfig: { 
              aspectRatio,
              imageSize: "1K" // Pro exclusive
            },
            // Enable search grounding for pro models to improve visual accuracy
            tools: [{ googleSearch: {} }]
          }
        });

        if (!isMounted) return;

        let foundImage = false;
        const candidate = response.candidates?.[0];
        if (candidate && candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              setImageUrl(`data:${mimeType};base64,${base64Data}`);
              foundImage = true;
              break;
            } else if (part.text) {
              console.log("Model response text:", part.text);
            }
          }
        }

        if (!foundImage) throw new Error("The model did not return an image part.");
      } catch (err: any) {
        if (isMounted) {
          const errMsg = err.message || "";
          setError(errMsg.includes("Requested entity was not found") ? "API Key mismatch" : "Generation failure");
        }
        console.error("AI Generation Error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generate();
    return () => { isMounted = false; };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`bg-slate-50 animate-pulse flex items-center justify-center border border-slate-100 ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-400">
            <i className="fa-solid fa-wand-magic-sparkles animate-pulse"></i>
          </div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Imaging...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-slate-50 flex items-center justify-center border border-slate-100 p-4 text-center ${className}`}>
        <div className="space-y-2">
           <i className="fa-solid fa-circle-exclamation text-slate-300"></i>
           <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{error || "Failed to render"}</div>
        </div>
      </div>
    );
  }

  return (
    <img src={imageUrl} alt={prompt} className={`object-cover ${className}`} loading="lazy" />
  );
};
