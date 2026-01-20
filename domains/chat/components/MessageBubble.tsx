import Alchol from '@/assets/icons/alchol.svg';
import type { LiquorSource } from '@/domains/chat/api/chatApi';
import type { MessageRole } from '@/domains/chat/model/chatModel';
import { parseMessageText } from '@/domains/chat/utils/textFormatter';
import { Colors } from '@/shared/constants/Colors';
import { Layout } from '@/shared/constants/Layout';
import { Typography } from '@/shared/constants/Typography';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceCard } from './SourceCard';

interface MessageBubbleProps {
  content: string;
  role: MessageRole;
  backgroundColor: string;
  textColor: string;
  timeText: string;
  showIcon?: boolean;
  sources?: LiquorSource[];
}

export const MessageBubble = ({ content, role, backgroundColor, textColor, timeText, showIcon = true, sources }: MessageBubbleProps) => (
  <View style={[styles.container, role === 'user' ? styles.userContainer : styles.botContainer]}>
    {role === 'user' && <Text style={styles.timeText}>{timeText}</Text>}
    <View style={styles.bubbleContainer}>
      {showIcon && role === 'bot' && (
        <View style={styles.iconWrapper}>
          <Alchol width={24} height={24} />
        </View>
      )}
      <View style={styles.contentWrapper}>
        {role === 'bot' && (
          <View style={[styles.leftTail, { borderRightColor: backgroundColor }]} />
        )}
        <View>
          <View style={[styles.bubble, { backgroundColor }]}>
            <Text style={[styles.text, { color: textColor }]}>
              {parseMessageText(content).map((segment, index) => (
                <Text
                  key={index}
                  style={segment.isBold ? styles.boldText : undefined}
                >
                  {segment.text}
                </Text>
              ))}
            </Text>
          </View>
          {sources && sources.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.sourcesScrollView}
              contentContainerStyle={styles.sourcesContainer}
            >
              {sources.map((source) => (
                <SourceCard key={source.id} source={source} />
              ))}
            </ScrollView>
          )}
        </View>
        {role === 'user' && (
          <View style={[styles.rightTail, { borderLeftColor: backgroundColor }]} />
        )}
      </View>
    </View>
    {role === 'bot' && <Text style={styles.timeText}>{timeText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Layout.MESSAGE_SPACING,
    paddingHorizontal: 10,
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  bubbleContainer: {
    maxWidth: '85%',
  },
  iconWrapper: {
    zIndex: 1,
    backgroundColor: Colors.yellow,
    width: 30,
    height: 30,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: Layout.INPUT_VERTICAL,
    borderRadius: 2,
  },
  text: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
  },
  timeText: {
    fontSize: 10,
    color: '#999',
    marginHorizontal: 8,
  },
  leftTail: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    marginRight: -2,
  },
  rightTail: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    marginLeft: -2,
  },
  boldText: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontWeight: '900',
  },
  sourcesScrollView: {
    marginTop: 8,
  },
  sourcesContainer: {
    paddingRight: 10,
  },
});