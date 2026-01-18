import { useState, useEffect } from 'react';
import Groq from 'groq-sdk';
import Button from './Button';
import './Chat.css';
import { useSelector, useDispatch } from 'react-redux';
import { showHideWelcome } from '../redux/generalSlice';

const AVAILABLE_MODELS = [
  'llama-3.1-8b-instant',
  'llama-3.1-70b-versatile',
  'mixtral-8x7b-32768',
];

const Chat = () => {
  const groq = new Groq({
    apiKey: process.env.REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const dispatch = useDispatch();

  const generalSettings = useSelector((state)=> state.general);

  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);

  useEffect(() => {
    if (generalSettings.firstMessage) {
      handleSend(generalSettings.firstMessage);
    }
  }, [generalSettings.firstMessage]);

  // Recupera lo stato dal localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('chatState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setInputValue(parsed.inputValue || '');
      setChatMessages(parsed.chatMessages || []);
      setHistoryMessages(parsed.historyMessages || []);
      setIsChatVisible(parsed.isChatVisible || false);
      setSelectedModel(parsed.selectedModel || AVAILABLE_MODELS[0]);
    }
  }, []);

  // Salva lo stato nel localStorage
  useEffect(() => {
    localStorage.setItem(
      'chatState',
      JSON.stringify({
        inputValue,
        chatMessages,
        historyMessages,
        isChatVisible,
        selectedModel,
      })
    );
  }, [inputValue, chatMessages, historyMessages, isChatVisible, selectedModel]);

  const noChatPrompt = inputValue.trim() === '';

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = async (message) => {
    if (noChatPrompt && !message) return;

    let chatPrompt;
    if (message) {
      chatPrompt = message;
    } else {
      chatPrompt = `${inputValue}`;
    }
    
    try {
      const messages = [
        ...historyMessages,
        { role: 'user', content: 'Answer only to what I will write now: ' + chatPrompt },
      ];

      const chatCompletion = await groq.chat.completions.create({
        messages,
        model: selectedModel,
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      setChatMessages((prev) => [...prev, newChatMessage]);
      setHistoryMessages((prev) => [
        ...prev,
        { role: 'user', content: chatPrompt },
        { role: 'assistant', content: responseContent },
      ]);
      setIsChatVisible(true);
      setInputValue('');
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const newChatMessage = {
        prompt: chatPrompt,
        response: 'Error fetching chat completion',
      };
      setChatMessages((prev) => [...prev, newChatMessage]);
      setIsChatVisible(true);
      setInputValue('');
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
    setHistoryMessages([]);
    setIsChatVisible(false);
    setInputValue('');
    localStorage.removeItem('chatState');
    dispatch(showHideWelcome(true));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-component">
      {isChatVisible && (
        <div className="chat-container">
          {chatMessages.map((message, index) => (
            <div key={index} className="chatConversations">
              <div className="chat-prompt">{message.prompt}</div>
              <div
                className="chat-response"
                dangerouslySetInnerHTML={{ __html: message.response }}
              />
            </div>
          ))}
          <Button textContent="Clear Chat" handleClick={handleClearChat} />
        </div>
      )}
      <div className="searchBar-container">
        <div className="searchBar">
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button textContent="Send" handleClick={handleSend} disabled={noChatPrompt} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
