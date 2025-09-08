import { useState } from "react";
import styles from "./ChatWidget.module.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you with Cybomb Technologies?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://n8n.cybomb.com/webhook/80bcb73f-a9f6-49ea-91a4-724feb1ff13c/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input })
        }
      );

      const data = await res.json();
      console.log("n8n response:", data);

      // Extract bot response
      let botText = data.output || "Sorry, I couldn't process that request.";

      // Remove stars (*) and trim extra spaces
      botText = botText.replace(/\*/g, "").trim();

      // Split into points, remove empty ones
      const botPoints = botText
        .split(". ")
        .map(point => point.trim())
        .filter(point => point !== "");

      // Join as separate lines
      const bulletMessage = botPoints.join("\n");

      // Add as single bot message
      setMessages((prev) => [...prev, { sender: "bot", text: bulletMessage }]);

    } catch (error) {
      console.error("Error connecting to AI:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to chatbot service. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatWidget}>
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.chatIcon}>💬</span>
        
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}><img src="/images/logo-11.png" alt="" style={{width:"40px"}}/></span>
              </div>
              <div className={styles.headerText}>
                <div className={styles.companyName}>Cybomb Technologies</div>
                <div className={styles.status}>
                  <span className={styles.statusIndicator}></span>
                  Online
                </div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${
                  msg.sender === "user" ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>
                  {msg.sender === "bot" ? (
                    <div className={styles.pointList}>
                      {msg.text.split("\n").map((line, i) => (
                        line.trim() && (
                          <div key={i} className={styles.pointItem}>
                            • {line}
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.chatFooter}>
            <div className={styles.inputContainer}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
                className={styles.messageInput}
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading}
                className={styles.sendButton}
              >
                {isLoading ? (
                  <span className={styles.loadingSpinner}></span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}