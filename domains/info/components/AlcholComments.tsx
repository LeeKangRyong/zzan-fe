import { INFO_CONSTANTS } from "@/domains/info/model/constants";
import type { LiquorComment } from "@/domains/info/model/mock";
import { AlcholButton, RateButton } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AlcholCommentCard } from "./AlcholCommentCard";

interface AlcholCommentsProps {
  comments: LiquorComment[];
  currentUserId?: string;
  onAddCommentPress: () => void;
  onEditPress?: (commentId: string) => void;
  onSaveComment?: (rating: number, comment: string) => void;
}

interface SectionHeaderProps {
  isEditMode: boolean;
  rating: number;
  comment: string;
  onAddPress: () => void;
  onRatingChange: (rating: number) => void;
  onCommentChange: (text: string) => void;
  onSave: () => void;
}

const SectionHeader = ({
  isEditMode,
  rating,
  comment,
  onAddPress,
  onRatingChange,
  onCommentChange,
  onSave,
}: SectionHeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.title}>코멘트</Text>
    {/* AlcholCommentsCard에서 edit icon 클릭 시 AlcholButton이 PutComments로 바뀜 */}
    {/* 저장하기 누르면, 후기 수정되면서 다시 AlcholButton으로 바뀌고 아래 후기 수정됨 */}
    {isEditMode ? (
      <PutComments
        rating={rating}
        comment={comment}
        onRatingChange={onRatingChange}
        onCommentChange={onCommentChange}
        onSave={onSave}
      />
    ) : (
      <AlcholButton title="저도 이 술을 먹었어요!" onPress={onAddPress} disabled />
    )}
  </View>
);

interface PutCommentsProps {
  rating: number;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (text: string) => void;
  onSave: () => void;
}

// RateStyleButton UI에 Text 상자 넣어놓기!
const PutComments = ({
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  onSave,
}: PutCommentsProps) => (
  <View style={styles.editContainer}>
    <Text style={styles.editTitle}>취향에 얼마나 맞았나요?</Text>
    <View style={styles.rateButtonWrapper}>
      <RateButton rating={rating} onRatingChange={onRatingChange} size={42} />
    </View>
    <TextInput
      style={styles.commentInput}
      value={comment}
      onChangeText={onCommentChange}
      placeholder="조금 씁슬한 맛이 조금 불호였지만 그래도 달콤하고 맛있었어요"
      placeholderTextColor={`${Colors.black}4D`}
      multiline
    />
    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
      <Text style={styles.saveButtonText}>저장하기</Text>
    </TouchableOpacity>
  </View>
);

const CommentList = ({
  comments,
  currentUserId,
  onEdit,
}: {
  comments: LiquorComment[];
  currentUserId?: string;
  onEdit?: (commentId: string) => void;
}) => (
  <ScrollView
    horizontal
    contentContainerStyle={styles.commentList}
    showsHorizontalScrollIndicator={false}
  >
    {comments.map((comment) => {
      const isOwner = currentUserId ? comment.userId === currentUserId : false;
      return (
        <AlcholCommentCard
          key={comment.id}
          username={comment.username}
          userProfileImage={comment.userProfileImage}
          rating={comment.rating}
          comment={comment.comment}
          date={comment.date}
          isOwner={isOwner}
          onEditPress={onEdit ? () => onEdit(comment.id) : undefined}
        />
      );
    })}
  </ScrollView>
);

export const AlcholComments = ({
  comments,
  currentUserId,
  onAddCommentPress,
  onEditPress,
  onSaveComment,
}: AlcholCommentsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const handleEditPress = (commentId: string) => {
    const targetComment = comments.find((c) => c.id === commentId);
    if (!targetComment) return;

    setEditRating(targetComment.rating);
    setEditComment(targetComment.comment);
    setIsEditMode(true);

    if (onEditPress) {
      onEditPress(commentId);
    }
  };

  const handleSave = () => {
    if (onSaveComment) {
      onSaveComment(editRating, editComment);
    }
    setIsEditMode(false);
    setEditRating(0);
    setEditComment('');
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        isEditMode={isEditMode}
        rating={editRating}
        comment={editComment}
        onAddPress={onAddCommentPress}
        onRatingChange={setEditRating}
        onCommentChange={setEditComment}
        onSave={handleSave}
      />
      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        onEdit={handleEditPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    gap: 12,
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    letterSpacing: 0,
    lineHeight: 26.64,
  },
  commentList: {
    paddingHorizontal: INFO_CONSTANTS.SUMMARY_PADDING_HORIZONTAL,
    gap: 12,
  },
  editContainer: {
    backgroundColor: Colors.takju,
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  editTitle: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.28,
  },
  rateButtonWrapper: {
    alignItems: 'center',
  },
  commentInput: {
    backgroundColor: '#DEDCD8',
    borderRadius: 6,
    padding: 12,
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Colors.black,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.yellow,
    letterSpacing: -0.28,
  },
});
