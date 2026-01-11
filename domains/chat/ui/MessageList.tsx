import type { Message } from '@/domains/chat/model/chatModel';
import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface MessageListProps {
  messages: Message[];
  renderMessage: (message: Message, index: number) => React.ReactNode;
}

export const MessageList = ({ messages, renderMessage }: MessageListProps) => {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView ref={scrollRef} style={styles.list} contentContainerStyle={styles.content}>
      {messages.map((message, index) => renderMessage(message, index))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
