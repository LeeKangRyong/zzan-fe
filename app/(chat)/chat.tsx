import { MessageBubble, MessageInput, MessageList, RecommendedAnswers } from '@/domains/chat/components';
import type { Message } from '@/domains/chat/model/chatModel';
import { CHAT_CONSTANTS } from '@/domains/chat/model/constants';
import { useChatViewModel } from '@/domains/chat/viewmodel/useChatViewModel';
import { Header } from '@/shared/components';
import { Colors, Layout } from '@/shared/constants';
import { useFormatTime } from '@/shared/hooks';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const shouldShowIcon = (messages: Message[], index: number): boolean => {
  const currentMessage = messages[index];

  // 봇 메시지가 아니면 false
  if (currentMessage.role !== 'bot') {
    return false;
  }

  // 첫 번째 메시지면 true
  if (index === 0) {
    return true;
  }

  // 이전 메시지가 봇이 아니면 true (새로운 봇 시퀀스 시작)
  const previousMessage = messages[index - 1];
  return previousMessage.role !== 'bot';
};

export default function ChatTab() {
  const vm = useChatViewModel();
  const { formatTime } = useFormatTime();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={{ flex: 1, backgroundColor: Colors.takju }}>
        <Header title="AI 챗봇" onBackPress={() => router.back() }/>
        <MessageList
          messages={vm.messages}
          renderMessage={(msg, index) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              role={msg.role}
              backgroundColor={msg.role === 'user' ? Colors.gray : Colors.white}
              textColor={Colors.black}
              timeText={formatTime(msg.timestamp)}
              showIcon={shouldShowIcon(vm.messages, index)}
            />
          )}
        />
        <View style={[styles.inputContainer, { paddingBottom: safeBottom }]}>
          <View style={styles.horizontalPadding}>
            <RecommendedAnswers
            answers={vm.recommendedAnswers}
            onSelectAnswer={vm.handleRecommendedAnswer}
            labelColor={Colors.black}
            chipBackgroundColor={Colors.yellow}
            chipTextColor={Colors.black}
          />
          </View>
          <View style={{ marginHorizontal: 16 }}>
            <MessageInput
              value={vm.inputValue}
              onChangeText={vm.setInputValue}
              onSend={vm.handleSendMessage}
              placeholder={CHAT_CONSTANTS.INPUT_PLACEHOLDER}
              maxLength={CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
              backgroundColor={Colors.takju}
              textColor={Colors.black}
              placeholderColor={Colors.black}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: Colors.white
  },
  horizontalPadding: {
    paddingHorizontal: 10,
  }
});
