import React, { useEffect, useRef, useState } from "react";
import { api } from "../lib/api"
import { LuSend } from "react-icons/lu";

const SuggestionQ = [
  "Recommend beginner courses",
  "Compare Python courses",
  "What are the best design courses?",
  "Help me choose a career path",
];

function MessageTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Ai() {
  const [messages, setMessages] = useState([]);          
  const [inputText, setInputText] = useState("");      
  const [isLoading, setIsLoading] = useState(false);      
  const [errorMessage, setErrorMessage] = useState(""); 
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (forcedText) => {
    const textToSend = (forcedText ?? inputText).trim();
    if (!textToSend || isLoading) return;

    setInputText("");
    setErrorMessage("");
    setIsLoading(true);

    const createdAt = Date.now();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: textToSend, time: createdAt },
    ]);

    try {
     const apiResponse = await api.aiChat({ message: textToSend, user_id: "rana-ui" });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: apiResponse.message, time: Date.now() },
      ]);
    } catch (error) {
      const safeMessage = error?.message || "Error, to get response";
      setErrorMessage(safeMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't respond right now. Please Try again.",
          time: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const ShowSuggestions = messages.length === 0 && !isLoading;

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-6">

      <div className="mb-2">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          AI Study Assistant
        </h1>
        <p className="text-md text-slate-500 dark:text-slate-400">
          Ask me anything about courses
        </p>
      </div>

      <div className="h-px bg-slate-200/80 dark:bg-slate-700/60 mb-6" />

      <div className="rounded-2xl dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/70 p-6">

        {ShowSuggestions && (
          <div className="py-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ebf2fe] dark:bg-[#17263f]">
              <LuSend className="h-8 w-8 text-[#3b82f6] dark:text-blue-300" />
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-[16px] font-semibold text-slate-900 dark:text-slate-100">
                Welcome to StudyMate AI Assistant
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-slate-500 dark:text-slate-400">
                I'm here to help you find the perfect course, answer questions,
                and guide your learning journey.
              </p>

              <p className="mt-6 text-[13px] text-slate-500 dark:text-slate-400">Try asking:</p>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {SuggestionQ.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 
                               bg-white hover:border-blue-500 hover:bg-slate-50
                               dark:bg-slate-800/60 dark:hover:bg-slate-800
                               px-4 py-3 text-sm text-gray-700 dark:text-slate-200 text-left transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="min-h-[120px] space-y-3">
          {messages.map((messageItem, index) => {
            const isUser = messageItem.role === "user";
            return (
              <div key={index} className={isUser ? "text-right" : ""}>
                <div
                  className={`inline-block max-w-[90%] md:max-w-[70%] rounded-2xl px-3 py-2 whitespace-pre-line text-[15px] leading-6
                              ${isUser
                                ? "bg-[#3b82f6] text-white"
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"}`}
                >
                 <div>{messageItem.text.replace(/\*\*/g, "").replace(/[_#`]/g, "")}</div>


                  <div
                    className={`mt-1 text-[11px]
                                ${isUser ? "text-white/80 text-right" : "text-slate-500 dark:text-slate-400 text-left"}`}
                  >
                    {MessageTime(messageItem.time)}
                  </div>
                </div>
              </div>
);
    })}

          {isLoading && (
            <div className="text-left">
              <div className="inline-block rounded-2xl px-3 py-2 bg-[#f9fafb] dark:bg-slate-800 animate-pulse text-slate-700 dark:text-slate-200">
                Thinking…
              </div>
            </div>
          )}

          <div ref={endOfMessagesRef} />
        </div>

        {!!errorMessage && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}

        {!ShowSuggestions && (
          <>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {SuggestionQ.map((question) => (
<button key={question} onClick={() => sendMessage(question)} disabled={isLoading}
      className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors
                              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
                              border-slate-300 text-slate-700 bg-white hover:bg-slate-50
                              dark:border-slate-700 dark:text-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800`}
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mt-3 h-px bg-gray-200 dark:bg-gray-700" />
          </>
        )}

        <div className="mt-4 flex items-center gap-3">
          <input
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && sendMessage()}
            placeholder="Ask about courses, get recommendations..."
            className="flex-1 h-12 rounded-lg border border-slate-300 dark:border-slate-700
                       bg-white dark:bg-slate-900 px-5 text-[15px]
                       placeholder:text-slate-400 dark:placeholder:text-slate-500
                       text-slate-800 dark:text-slate-100
                       focus:outline-none focus:ring-2 focus:border-blue-400 focus:ring-blue-500/50"
            disabled={isLoading}
            aria-label="Type your message"
          />

          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !inputText.trim()}
            className={`inline-flex items-center justify-center
                        h-12 w-12 rounded-xl transition-colors
                        ${isLoading || !inputText.trim()
                          ? "bg-blue-300/60 text-white"
                          : "bg-[#3b82f6] hover:bg-blue-700 text-white"
                        }`}
            title="Send"
            aria-label="Send message"
          >
            <LuSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ai;
