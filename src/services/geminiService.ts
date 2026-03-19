import { GoogleGenAI, Type } from "@google/genai";

const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using mock data.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateYouTubeIdeas = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    // Return mock data if no API key
    return [
      { title: `I Tried the '2-Hour Workday' for 30 Days (${topic})`, views: "1.2M", avg: "150K", hook: "Curiosity + Challenge" },
      { title: `Why 99% of ${topic} Apps are Useless`, views: "850K", avg: "90K", hook: "Contrarian + Negative" },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 4 highly clickable, viral-style YouTube video ideas about "${topic}". For each idea, provide a catchy title, estimated outlier views (e.g., "1.2M"), average channel views (e.g., "150K"), and the psychological hook used (e.g., "Curiosity + Challenge").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              views: { type: Type.STRING },
              avg: { type: Type.STRING },
              hook: { type: Type.STRING },
            },
            required: ["title", "views", "avg", "hook"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw error;
  }
};

export const generateThumbnailsAndTitles = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      titles: [`How to Master ${topic}`, `The Truth About ${topic}`],
      thumbnails: ["https://picsum.photos/seed/thumb1/640/360", "https://picsum.photos/seed/thumb2/640/360"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 catchy YouTube titles and 3 thumbnail concepts for a video about "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: { type: Type.ARRAY, items: { type: Type.STRING } },
            thumbnails: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["titles", "thumbnails"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { titles: [], thumbnails: [] };
  } catch (error) {
    console.error("Error generating thumbnails and titles:", error);
    throw error;
  }
};

export const repurposeContent = async (sourceType: 'youtube' | 'article' | 'pdf' | 'format', content: string) => {
  const ai = getAi();
  if (!ai) {
    return `[Mock Repurposed Post from ${sourceType}]\n\nHere is a great post based on your ${sourceType} content:\n\n${content.substring(0, 100)}...`;
  }

  let prompt = "";
  switch (sourceType) {
    case 'youtube':
      prompt = `Turn the following YouTube video link/description into a highly engaging LinkedIn post. Focus on the key takeaways and make it actionable:\n\n${content}`;
      break;
    case 'article':
      prompt = `Summarize the following article link/content into a compelling LinkedIn post. Highlight the main arguments and ask a question at the end to drive engagement:\n\n${content}`;
      break;
    case 'pdf':
      prompt = `Extract the most valuable insights from the following text (extracted from a PDF) and format it into a professional LinkedIn post with bullet points:\n\n${content}`;
      break;
    case 'format':
      prompt = `Take the following clunky or unformatted text and rewrite it into a clean, readable, and professional LinkedIn post. Use appropriate spacing, emojis, and a strong hook:\n\n${content}`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error repurposing content:", error);
    throw error;
  }
};

export const generatePinterestPinFromUrl = async (url: string, aspectRatio: string) => {
  const ai = getAi();
  if (!ai) {
    return `https://picsum.photos/seed/${encodeURIComponent(url)}/1000/1500`;
  }

  try {
    // Step 1: Analyze the URL and generate an image prompt
    const promptResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following blog post URL and generate a highly detailed, visually appealing image prompt for a Pinterest pin that represents the core topic of the article. The prompt should describe the visual elements, colors, and overall mood. Do NOT include text in the image prompt, just the visual scene. Make it suitable for an AI image generator. URL: ${url}`,
      config: {
        tools: [{ urlContext: {} }]
      }
    });

    const imagePrompt = promptResponse.text || "A beautiful aesthetic Pinterest pin background with soft colors and elegant design.";

    // Step 2: Generate the image
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: imagePrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
        },
      },
    });

    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating Pinterest pin:", error);
    throw error;
  }
};

export const generateYouTubeScript = async (title: string, hook: string) => {
  const ai = getAi();
  if (!ai) {
    return `[HOOK]\n(0:00-0:15)\n"This is a mock script for ${title} using the ${hook} hook..."`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a YouTube video script for a video titled "${title}". The video uses a "${hook}" hook. 
Format the script clearly with headings like [HOOK], [INTRO], [BODY], [OUTRO] and include estimated timestamps in parentheses like (0:00-0:15) below each heading. 
Separate sections with blank lines. Keep it engaging and fast-paced.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};

export const modifyYouTubeScript = async (script: string, instruction: string) => {
  const ai = getAi();
  if (!ai) {
    return `[MOCK MODIFIED SCRIPT]\n\n${script}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Here is a YouTube script:\n\n${script}\n\nPlease modify this script based on the following instruction: ${instruction}. Return ONLY the modified script.`,
    });
    return response.text || script;
  } catch (error) {
    console.error("Error modifying script:", error);
    throw error;
  }
};

export const analyzeCompetitor = async (url: string) => {
  const ai = getAi();
  if (!ai) {
    return { 
      name: `Channel ${url.substring(0, 10)}`, subs: "1M", 
      recentOutlier: "Mock Outlier Video", outlierViews: "5M", 
      avgViews: "500K", multiplier: "10x", publishedAt: "Just now", 
      duration: "10:00", status: "Tracking", tags: ["Mock", "Video"] 
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the YouTube channel URL: "${url}". Since you don't have live access, invent a realistic competitor profile for this channel or a generic channel if the URL is invalid. Provide the channel name, subscriber count (e.g., "5.2M"), a recent outlier video title, its views (e.g., "2.4M"), average views (e.g., "250K"), performance multiplier (e.g., "9.6x"), published date (e.g., "2 days ago"), video duration (e.g., "14:20"), and 3 relevant tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            subs: { type: Type.STRING },
            recentOutlier: { type: Type.STRING },
            outlierViews: { type: Type.STRING },
            avgViews: { type: Type.STRING },
            multiplier: { type: Type.STRING },
            publishedAt: { type: Type.STRING },
            duration: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["name", "subs", "recentOutlier", "outlierViews", "avgViews", "multiplier", "publishedAt", "duration", "tags"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      const data = JSON.parse(text);
      return { ...data, status: "Tracking" };
    }
    return null;
  } catch (error) {
    console.error("Error analyzing competitor:", error);
    throw error;
  }
};

export const generateTitlesAndTags = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      titles: ["Mock Title 1", "Mock Title 2"],
      tags: ["mock", "tags", "youtube"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 highly clickable, SEO-optimized YouTube title variations and 15 relevant SEO tags for a video about "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["titles", "tags"]
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { titles: [], tags: [] };
  } catch (error) {
    console.error("Error generating titles and tags:", error);
    throw error;
  }
};

export const generateThumbnailImage = async (concept: string, desc: string) => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set. Using mock image.");
    return null;
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: `A YouTube thumbnail image for the concept: "${concept}". Description: ${desc}. Make it highly clickable, vibrant, and engaging. No text in the image.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      },
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating thumbnail image:", error);
    throw error;
  }
};

export const generateSimilarIdeas = async (outlierVideoTitle: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      `How to replicate the success of "${outlierVideoTitle}"`,
      `5 variations of "${outlierVideoTitle}" for your channel`,
      `Why "${outlierVideoTitle}" went viral`,
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 similar YouTube video ideas based on the outlier video titled: "${outlierVideoTitle}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating similar ideas:", error);
    throw error;
  }
};

export const analyzeBooks = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { title: "Book 1", author: "Author 1", insight: "Insight about ${topic}" },
      { title: "Book 2", author: "Author 2", insight: "Insight about ${topic}" },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 books that provide deep insights into the topic: "${topic}". For each book, provide the title, author, and a brief insight relevant to the topic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              insight: { type: Type.STRING },
            },
            required: ["title", "author", "insight"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error analyzing books:", error);
    throw error;
  }
};

export const generatePostFromTranscript = async (transcript: string, persona: string, formatting: string) => {
  const ai = getAi();
  if (!ai) {
    return `[MOCK POST]\n\nConsistency > Perfection.\n\nMost people think they need a groundbreaking idea to post on LinkedIn.\n\nThey don't.\n\nThey just need to show up every day with something valuable.\n\nThat's the real secret to building an audience.\n\nStop trying to go viral.\nStart documenting your journey.\n\nWhat's your biggest struggle with consistency?`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Turn the following voice transcript into a professional, engaging LinkedIn post.\n\nTranscript: "${transcript}"\n\nPersona/Style: ${persona}\nFormatting Preference: ${formatting}\n\nMake sure it has a strong hook, clear formatting, and an engaging question at the end.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating post from transcript:", error);
    throw error;
  }
};

export const generateFirstComment = async (postContent: string) => {
  const ai = getAi();
  if (!ai) {
    return "[MOCK COMMENT] P.S. If you found this helpful, I share tips like this every week in my newsletter. Join 10k+ others here: [link]";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an engaging first comment for the following LinkedIn post. The comment should add value, ask a follow-up question, or provide a natural plug for a newsletter/resource.\n\nPost Content:\n"${postContent}"\n\nKeep it concise, professional, and engaging.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating first comment:", error);
    throw error;
  }
};

export const generatePostContent = async (title: string, platform: string) => {
  const ai = getAi();
  if (!ai) {
    return `[MOCK POST for ${platform}]\n\n${title}\n\nHere are 3 key takeaways:\n1. Value point one\n2. Value point two\n3. Value point three\n\nWhat are your thoughts?`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an engaging social media post for ${platform} based on the following title/topic:\n\nTitle: "${title}"\n\nMake sure the tone and formatting are optimized for ${platform}.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating post content:", error);
    throw error;
  }
};

export const generateXTweets = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { text: `Just realized 99% of people are doing ${topic} wrong. Here's the 1% framework that actually works: 👇`, type: "Thread Hook" },
      { text: `Unpopular opinion: ${topic} is overrated. Focus on consistency instead.`, type: "Controversial" },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 4 highly engaging, viral-style X (Twitter) posts about "${topic}". Provide the text of the tweet and the type of hook used (e.g., "Thread Hook", "Controversial", "Listicle", "Myth Buster"). Keep them under 280 characters.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["text", "type"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating tweets:", error);
    throw error;
  }
};

export const rewriteXTweet = async (tweet: string, style: string) => {
  const ai = getAi();
  if (!ai) {
    if (style === "bold") return `Stop making excuses. ${tweet.toUpperCase()} Do the work.`;
    if (style === "funny") return `Me trying to understand ${tweet.substring(0, 20)}... 🤡`;
    return `Here's a fresh perspective: ${tweet}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rewrite the following X (Twitter) post to be more ${style}:\n\n"${tweet}"\n\nReturn ONLY the rewritten text.`,
    });
    return response.text || tweet;
  } catch (error) {
    console.error("Error rewriting tweet:", error);
    throw error;
  }
};

export const simulateAlgorithm = async (tweet: string) => {
  const ai = getAi();
  if (!ai) {
    const score = Math.floor(Math.random() * 40) + 60;
    return {
      score,
      reach: `${Math.floor(score * 1.5)}k`,
      engagement: `${Math.floor(score / 10)}%`,
      feedback: score > 80 ? "Strong hook, good formatting." : "Consider adding a question or stronger hook."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Simulate the X (Twitter) algorithm for this tweet:\n\n"${tweet}"\n\nProvide an algorithmic score (0-100), estimated reach (e.g., "15k"), estimated engagement rate (e.g., "4.5%"), and 1 sentence of feedback on how to improve it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reach: { type: Type.STRING },
            engagement: { type: Type.STRING },
            feedback: { type: Type.STRING },
          },
          required: ["score", "reach", "engagement", "feedback"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error simulating algorithm:", error);
    throw error;
  }
};

export const generateSlideImage = async (slideText: string, visualSuggestion: string, globalTheme: string, slideIndex: number, totalSlides: number, annotation?: string, handle?: string, persona?: string) => {
  const ai = getAi();
  if (!ai) {
    // Mock image
    return new Promise<string>(resolve => setTimeout(() => resolve(`https://picsum.photos/seed/${Math.random()}/800/800`), 1500));
  }

  let prompt = `Create a professional LinkedIn carousel slide (Slide ${slideIndex} of ${totalSlides}).
  
  CRITICAL INSTRUCTION: You are generating one slide of a continuous carousel. The design MUST strictly follow this global theme to ensure seamless continuity across all slides:
  Global Theme: "${globalTheme}"
  
  Ensure font styling, typography preferences, and color selection are uniformly applied based on the Global Theme. The overall image should look like a seamless blend with the rest of the carousel, not an isolated image.
  
  Text on slide: "${slideText}"
  Visual concept for this specific slide: "${visualSuggestion}"
  
  Style Requirements: 
  - MUST be exactly a 1:1 square dimension.
  - Maintain a highly refined, premium, and simplified aesthetic.
  - Stick exclusively with the Montserrat font family for all text.
  - Ensure colors, fonts, and graphics utilize elegant gradients.
  - Ensure all graphics and vectors used are uniform and in the exact same theme for all slides (1 to ${totalSlides}).
  - Ensure proper styling, spacing, padding, and margins are given so the slide looks professional, clean, and premium.
  
  PAGINATION: Add "${slideIndex}/${totalSlides}" in the bottom right corner.`;

  if (handle) {
    const cleanHandle = handle.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/^@/, '').replace(/\/$/, '');
    prompt += `\nWATERMARK: Add "LinkedIn.com/${cleanHandle}" as a watermark in the bottom left corner using Montserrat font in simple words styling. Do NOT use the full URL.`;
  }
  
  if (persona) {
    prompt += `\nPERSONA CONTEXT: The author's persona is: "${persona}". Ensure the visual tone aligns with this professional identity.`;
  }

  if (annotation) {
    prompt += `\nAdditional user instruction: "${annotation}"`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating slide image:", error);
    throw error;
  }
};

export const generateLinkedInPosts = async (topic: string, persona?: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { text: `I'm thrilled to share some insights on ${topic}. Over the past few years, I've learned that...`, type: "Storytelling" },
      { text: `3 actionable tips for mastering ${topic}:\n\n1. Start small\n2. Be consistent\n3. Measure results`, type: "Listicle" },
    ];
  }

  let prompt = `Generate 3 highly engaging, professional LinkedIn posts about "${topic}". Provide the text of the post and the type of format used (e.g., "Storytelling", "Actionable Advice", "Thought Leadership"). Keep them structured with good spacing.`;
  if (persona) {
    prompt += `\n\nCRITICAL INSTRUCTION: Write these posts strictly from the perspective of the following persona:\n"${persona}"\n
    You MUST ensure the content reflects:
    1. Strong leadership and a clear thought process.
    2. Actionable tips, tricks, and overall helpful takeaways for the reader.
    3. The user as an absolute industry expert in their domain.
    4. A tone that is creative, fun, yet builds significant authority in the subject matter space.
    Ensure the vocabulary and perspective perfectly match this persona.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["text", "type"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating LinkedIn posts:", error);
    throw error;
  }
};

export const rewriteLinkedInPost = async (post: string, style: string, persona?: string) => {
  const ai = getAi();
  if (!ai) {
    if (style === "storytelling") return `Let me tell you a story about ${post.substring(0, 20)}...`;
    if (style === "actionable") return `Here are 3 steps to achieve this: ${post}`;
    return `From my experience in the industry: ${post}`;
  }

  let prompt = `Rewrite the following LinkedIn post to be more focused on ${style}:\n\n"${post}"\n\nReturn ONLY the rewritten text, formatted nicely for LinkedIn with appropriate spacing.`;
  
  if (persona) {
    prompt += `\n\nCRITICAL INSTRUCTION: Ensure the rewritten post strictly reflects the following persona:\n"${persona}"\n
    Incorporate elements of strong leadership, actionable tips, industry expertise, and a tone that is creative, fun, and builds authority.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || post;
  } catch (error) {
    console.error("Error rewriting LinkedIn post:", error);
    throw error;
  }
};

export const simulateLinkedInAlgorithm = async (post: string) => {
  const ai = getAi();
  if (!ai) {
    const score = Math.floor(Math.random() * 40) + 60;
    return {
      score,
      reach: `${Math.floor(score * 2.5)}k`,
      engagement: `${Math.floor(score / 8)}%`,
      feedback: score > 80 ? "Great structure and professional tone." : "Try adding more spacing and a clear call to action."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Simulate the LinkedIn algorithm for this post:\n\n"${post}"\n\nProvide an algorithmic score (0-100), estimated impressions (e.g., "25k"), estimated engagement rate (e.g., "3.5%"), and 1 sentence of feedback on how to improve it for a professional audience.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reach: { type: Type.STRING },
            engagement: { type: Type.STRING },
            feedback: { type: Type.STRING },
          },
          required: ["score", "reach", "engagement", "feedback"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error simulating LinkedIn algorithm:", error);
    throw error;
  }
};

export const generatePostFromExperience = async (experience: string) => {
  const ai = getAi();
  if (!ai) {
    return `Based on your experience: "${experience}", here is a professional LinkedIn post...`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Turn the following experience into a professional, engaging LinkedIn post:\n\n"${experience}"\n\nFocus on the key learnings and actionable takeaways.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating post from experience:", error);
    throw error;
  }
};

export const generatePostFromStory = async (story: string) => {
  const ai = getAi();
  if (!ai) {
    return `A story about ${story}: It's not about the destination, it's about the journey.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Turn the following personal story into a professional, engaging LinkedIn post: "${story}". Use a storytelling approach that highlights a key takeaway.`,
    });
    return response.text || story;
  } catch (error) {
    console.error("Error generating post from story:", error);
    throw error;
  }
};

export const generateCarouselContent = async (topic: string, persona?: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      globalTheme: "Modern, minimalist, corporate blue and white.",
      slides: [
        { title: "Introduction", content: `Why ${topic} matters in 2026.`, visualSuggestion: "Bold text on a clean background." },
        { title: "Key Insight", content: `The biggest shift in ${topic} is...`, visualSuggestion: "A simple diagram or chart." },
        { title: "Actionable Tip", content: `Start by doing this one thing...`, visualSuggestion: "A checklist graphic." }
      ]
    };
  }

  let prompt = `Generate a 5-slide LinkedIn carousel outline for the topic: "${topic}". 
      Also provide a 'globalTheme' description that defines a consistent visual style, color palette, and typography for all slides to ensure they look like a seamless, continuous carousel.
      CRITICAL THEME REQUIREMENTS: The globalTheme MUST specify a highly refined, premium, and simplified aesthetic. It MUST exclusively use the Montserrat font family. It MUST utilize elegant gradients for colors, fonts, and graphics.
      For each slide, provide a title, the main content text, and a suggestion for the visual design.
      CRITICAL CONTENT REQUIREMENTS: The main content text MUST be extremely crisp, concise, and punchy (maximum 2-3 short sentences or bullet points). It must fit comfortably inside a 1:1 square slide without overlapping or cropping. Ensure the wording is highly meaningful and provides a strong, actionable takeaway.`;
      
  if (persona) {
    prompt += `\n\nCRITICAL INSTRUCTION: Write the content and suggest the visual theme strictly from the perspective of the following persona:\n"${persona}"\n
    You MUST ensure the content reflects:
    1. Strong leadership and a clear thought process.
    2. Actionable tips, tricks, and overall helpful takeaways for the reader.
    3. The user as an absolute industry expert in their domain.
    4. A tone that is creative, fun, yet builds significant authority in the subject matter space.
    Ensure the vocabulary and visual style perfectly match this persona's professional identity.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            globalTheme: { type: Type.STRING },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  visualSuggestion: { type: Type.STRING },
                },
                required: ["title", "content", "visualSuggestion"],
              },
            },
          },
          required: ["globalTheme", "slides"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { globalTheme: "", slides: [] };
  } catch (error) {
    console.error("Error generating carousel:", error);
    throw error;
  }
};

export const generatePollContent = async (topic: string, persona?: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      question: `What is your biggest challenge with ${topic}?`,
      options: ["Time management", "Consistency", "Strategy", "Content quality"]
    };
  }

  let prompt = `Generate an engaging LinkedIn poll question about "${topic}" and 4 relevant options.`;
  if (persona) {
    prompt += `\n\nCRITICAL INSTRUCTION: Ensure the poll question and options reflect the following persona:\n"${persona}"\n
    The tone should position the user as an industry expert asking a thought-provoking question to their audience.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["question", "options"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { question: "", options: [] };
  } catch (error) {
    console.error("Error generating poll:", error);
    throw error;
  }
};

export const generatePersonaFromLinkedIn = async (handleOrUrl: string) => {
  const ai = getAi();
  if (!ai) {
    return `Persona for ${handleOrUrl}:\nA seasoned professional focused on growth, leadership, and innovation. Values clear communication and actionable insights.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following LinkedIn handle or URL: "${handleOrUrl}". 
      Since you may not be able to browse the live profile directly, infer a professional persona based on the handle name, or if it's a known public figure, use your knowledge. 
      If you can't determine specific details, create a strong, generic professional persona (e.g., "Tech Entrepreneur", "Marketing Leader", "B2B Sales Expert") that would fit this handle.
      
      CRITICAL INSTRUCTION: The persona MUST be structured to position this user as an absolute industry expert in their domain. It must explicitly reflect:
      1. Leadership and visionary thinking.
      2. A clear, analytical thought process.
      3. A focus on actionable tips, tricks, and overall helpful takeaways.
      4. A tone that blends creativity and fun with strong authority building in their subject matter space.
      
      Return a detailed 3-4 sentence description of their professional persona, tone of voice, and key topics they likely post about, incorporating all the traits above.`,
    });
    
    return response.text || `Persona for ${handleOrUrl}: Professional, insightful, and industry-focused.`;
  } catch (error) {
    console.error("Error generating persona:", error);
    throw error;
  }
};

// --- Instagram Assist Functions ---

export const generateInstaCaptions = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { text: `Behind the scenes of ${topic}! ✨\n\nDrop a 🤍 if you agree.\n\n#${topic.replace(/\s+/g, '')} #behindthescenes`, type: "Short & Sweet" },
      { text: `Let's talk about ${topic}. 👇\n\nI used to struggle with this, but then I realized...\n\nSave this for later! 📌\n\n#${topic.replace(/\s+/g, '')} #tips`, type: "Educational" },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 highly engaging Instagram captions about "${topic}". Provide the text of the caption (including emojis and 3-5 relevant hashtags) and the type of format used (e.g., "Short & Sweet", "Educational", "Storytelling"). Keep them formatted nicely for Instagram.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["text", "type"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating Instagram captions:", error);
    throw error;
  }
};

export const rewriteInstaCaption = async (caption: string, style: string) => {
  const ai = getAi();
  if (!ai) {
    if (style === "short") return `${caption.substring(0, 30)}... ✨`;
    if (style === "story") return `Story time! 📖 Let me tell you about ${caption}`;
    return `Relatable: ${caption} 😂`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rewrite the following Instagram caption to be more ${style}:\n\n"${caption}"\n\nReturn ONLY the rewritten text, formatted nicely for Instagram with emojis and hashtags.`,
    });
    return response.text || caption;
  } catch (error) {
    console.error("Error rewriting Instagram caption:", error);
    throw error;
  }
};

export const simulateInstaAlgorithm = async (caption: string) => {
  const ai = getAi();
  if (!ai) {
    const score = Math.floor(Math.random() * 40) + 60;
    return {
      score,
      reach: `${Math.floor(score * 3.5)}k`,
      engagement: `${Math.floor(score / 6)}%`,
      feedback: score > 80 ? "Great use of emojis and spacing." : "Try adding a stronger call to action (like 'Save this post')."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Simulate the Instagram algorithm for this caption:\n\n"${caption}"\n\nProvide an algorithmic score (0-100), estimated reach (e.g., "35k"), estimated engagement rate (e.g., "5.5%"), and 1 sentence of feedback on how to improve it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reach: { type: Type.STRING },
            engagement: { type: Type.STRING },
            feedback: { type: Type.STRING },
          },
          required: ["score", "reach", "engagement", "feedback"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error simulating Instagram algorithm:", error);
    throw error;
  }
};

// --- Threads Assist Functions ---

export const generateThreads = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { text: `Unpopular opinion: ${topic} is actually the key to success. Here's why: 👇`, type: "Thread Hook" },
      { text: `I spent 100 hours researching ${topic}. Here are the 5 things you need to know:`, type: "Educational" },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 highly engaging, viral-style Threads (series of connected posts) about "${topic}". 
      
      For each thread, follow this structure:
      1. Hook: A punchy, curiosity-inducing first post.
      2. Value: 3-5 follow-up posts providing actionable insights, data, or storytelling.
      3. Call to Action: A clear final post encouraging engagement (e.g., "Follow me for more", "What do you think?").
      
      Provide the text of the thread and the type of format used (e.g., "Thread Hook", "Educational", "Storytelling"). Keep them formatted nicely for Threads with line breaks.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["text", "type"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating Threads:", error);
    throw error;
  }
};

export const optimizeThreadHook = async (hook: string) => {
  const ai = getAi();
  if (!ai) {
    return `Stop scrolling! Here is why ${hook} is the most important thing you'll read today. 👇`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Optimize the following Threads hook to be more viral, engaging, and curiosity-inducing. Use proven hook frameworks like "The Curiosity Gap", "Contrarian", "Benefit-Driven", or "Storytelling".\n\nOriginal Hook: "${hook}"\n\nReturn ONLY the optimized hook text.`,
    });
    return response.text || hook;
  } catch (error) {
    console.error("Error optimizing thread hook:", error);
    throw error;
  }
};

export const simulateThreadsAlgorithm = async (thread: string) => {
  const ai = getAi();
  if (!ai) {
    const score = Math.floor(Math.random() * 40) + 60;
    return {
      score,
      reach: `${Math.floor(score * 2.5)}k`,
      engagement: `${Math.floor(score / 8)}%`,
      feedback: score > 80 ? "Strong hook and good flow." : "Try adding a more controversial hook or a clear call to action."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Simulate the Threads algorithm for this thread:\n\n"${thread}"\n\nAnalyze based on:
      1. Hook Strength (curiosity, contrarianism)
      2. Readability (formatting, spacing)
      3. Value Proposition (actionable insights)
      4. Call to Action (clarity)
      
      Provide an algorithmic score (0-100), estimated reach (e.g., "25k"), estimated engagement rate (e.g., "3.5%"), and 1 sentence of specific, actionable feedback on how to improve it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reach: { type: Type.STRING },
            engagement: { type: Type.STRING },
            feedback: { type: Type.STRING },
          },
          required: ["score", "reach", "engagement", "feedback"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error simulating Threads algorithm:", error);
    throw error;
  }
};

export const generateReelsScript = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { visual: "Hook: Pointing at text on screen", audio: "Did you know this about " + topic + "?" },
      { visual: "Body: Explaining point 1", audio: "First, you need to..." },
      { visual: "CTA: Pointing down", audio: "Read the caption for more!" }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a highly engaging, short-form video script (Instagram Reel / TikTok) about "${topic}". 
      Provide a hook, 3-4 body points, and a call to action. 
      For each part, describe the visual action and the audio/spoken text.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              visual: { type: Type.STRING },
              audio: { type: Type.STRING },
            },
            required: ["visual", "audio"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating Reels script:", error);
    throw error;
  }
};

export const generateInstaCarousel = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { slideNumber: 1, text: "Hook about " + topic, visualIdea: "Bold text on solid background" },
      { slideNumber: 2, text: "Point 1", visualIdea: "Icon with text" },
      { slideNumber: 3, text: "Save this post!", visualIdea: "Arrow pointing to save button" }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a 5-8 slide Instagram Carousel outline about "${topic}". 
      Slide 1 must be a strong hook. The middle slides should provide high value. The last slide must be a Call to Action.
      For each slide, provide the main text and a visual idea.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              slideNumber: { type: Type.NUMBER },
              text: { type: Type.STRING },
              visualIdea: { type: Type.STRING },
            },
            required: ["slideNumber", "text", "visualIdea"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating Insta Carousel:", error);
    throw error;
  }
};

export const generateInstaSEO = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      keywords: ["keyword1", "keyword2"],
      hashtags: ["#hashtag1", "#hashtag2"],
      altTextIdea: "A visually appealing image about " + topic
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an Instagram SEO strategy for a post about "${topic}". 
      Provide 5-8 high-search-volume keywords to include in the caption, 10-15 relevant hashtags (mix of broad and niche), and a suggestion for what the image alt text should be to rank well on Instagram Explore page.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            hashtags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            altTextIdea: { type: Type.STRING },
          },
          required: ["keywords", "hashtags", "altTextIdea"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { keywords: [], hashtags: [], altTextIdea: "" };
  } catch (error) {
    console.error("Error generating Insta SEO:", error);
    throw error;
  }
};

export const generateStorySequence = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { slide: 1, type: "Hook/Poll", content: "Do you struggle with " + topic + "?", visual: "Text with Yes/No poll" },
      { slide: 2, type: "Context", content: "I used to struggle with it too...", visual: "Talking head video" },
      { slide: 3, type: "Value", content: "Here is the #1 thing that changed it.", visual: "Text over background" },
      { slide: 4, type: "Soft Pitch", content: "Want my full guide? Link in bio.", visual: "Link sticker" }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a 4-part Instagram Story sequence about "${topic}". 
      The sequence should follow this arc: 1. The Hook/Poll, 2. The Context, 3. The Value/Behind-the-scenes, 4. The Soft Pitch/Link.
      For each slide, provide the content/text and a visual idea.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              slide: { type: Type.NUMBER },
              type: { type: Type.STRING },
              content: { type: Type.STRING },
              visual: { type: Type.STRING },
            },
            required: ["slide", "type", "content", "visual"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating Story Sequence:", error);
    throw error;
  }
};

export const generateContentPillars = async (niche: string) => {
  const ai = getAi();
  if (!ai) {
    return [
      { pillar: "Education", description: "Teaching your audience", ideas: ["How to X", "3 Tips for Y"] },
      { pillar: "Inspiration", description: "Motivating your audience", ideas: ["My journey", "Client success"] }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Define 4 distinct content pillars for an Instagram creator in the "${niche}" niche (e.g., Education, Inspiration, Personal, Promotional). 
      For each pillar, provide a brief description and 3 specific post ideas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              pillar: { type: Type.STRING },
              description: { type: Type.STRING },
              ideas: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["pillar", "description", "ideas"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating Content Pillars:", error);
    throw error;
  }
};

export const generateDMAutomation = async (offer: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      postCTA: "Comment 'LINK' to get my " + offer,
      dmScript: "Hey! Thanks for commenting. Here is the link to " + offer + ": [LINK]"
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a DM automation script (like ManyChat) for offering "${offer}". 
      Provide the perfect Call to Action (CTA) to put in the Instagram post/Reel caption (e.g., "Comment 'WORD' to get..."), 
      and the exact DM script that the bot should send when they comment. Make it conversational and engaging.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            postCTA: { type: Type.STRING },
            dmScript: { type: Type.STRING },
          },
          required: ["postCTA", "dmScript"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { postCTA: "", dmScript: "" };
  } catch (error) {
    console.error("Error generating DM Automation:", error);
    throw error;
  }
};

export const suggestAudioVibe = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      vibe: "Upbeat & Energetic",
      suggestion: "Use a fast-paced trending pop or hip-hop instrumental."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest the perfect Instagram Reels audio vibe for a video about "${topic}". 
      Provide the general vibe (e.g., "Lo-fi chill", "Fast-paced trending", "Motivational speaking") and a specific suggestion on how to use it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibe: { type: Type.STRING },
            suggestion: { type: Type.STRING },
          },
          required: ["vibe", "suggestion"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { vibe: "", suggestion: "" };
  } catch (error) {
    console.error("Error suggesting Audio Vibe:", error);
    throw error;
  }
};

export const analyzeCompetitorPost = async (postText: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      analysis: "This post uses a strong hook and relatable content.",
      recreationIdeas: ["Idea 1", "Idea 2", "Idea 3"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this competitor's viral Instagram post:\n\n"${postText}"\n\nBreak down *why* it works (hook analysis, pacing, emotional trigger). Then, generate 3 ways to recreate that success in a different brand voice or niche.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            recreationIdeas: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
          },
          required: ["analysis", "recreationIdeas"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { analysis: "", recreationIdeas: [] };
  } catch (error) {
    console.error("Error analyzing competitor post:", error);
    throw error;
  }
};
