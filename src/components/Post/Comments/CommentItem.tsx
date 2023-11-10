import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id?: string;
  creatorId: string;
  creatorDisplayText: string;
  creatorPhotoURL: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt?: Timestamp;
  likeCount?: number;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  isLoading: boolean;
  userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  isLoading,
  userId
}) => {
  // const [loading, setLoading] = useState(false);
  const [likes, setLikeCount] = useState(comment.likeCount || 0);
  const [upVoteType, setUpVote] = useState('')
  const [downVoteType, setDownVote] = useState('')
  const handleLikeCount = (type: string) => {
    if(upVoteType == 'UP') {
      setLikeCount(likes - 1);
      setUpVote('');
    }
    if(upVoteType == '' && downVoteType == ''){
      setLikeCount(likes + 1);
      setUpVote(type);
    }
    if(upVoteType == '' && downVoteType == 'DOWN'){
      setLikeCount(likes + 2);  
      setUpVote(type);
      setDownVote('');
    }
  };

  const handleDislikeCount = (type: string) => {
    if(downVoteType == 'DOWN') {
      setLikeCount(likes + 1);
      setDownVote('');
    }
    if(downVoteType == '' && upVoteType == ''){
      setLikeCount(likes - 1);
      setDownVote(type);
    }
    if(downVoteType == '' && upVoteType == 'UP'){
      setLikeCount(likes - 2);      
      setDownVote(type);
      setUpVote('');
    }
  };
  // const handleDelete = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const success = await onDeleteComment(comment);

  //     if (!success) {
  //       throw new Error("Error deleting comment");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     // setError
  //     setLoading(false);
  //   }
  // }, [setLoading]);

  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2} fontSize="8pt">
          <Text
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.creatorDisplayText}
          </Text>
          {comment.createdAt?.seconds && (
            <Text color="gray.600">
              {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          )}
          {isLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          fontWeight={600}
          color="gray.500"
        >
          <Icon
            as={IoArrowUpCircleOutline}
            color="gray.400"
            cursor="pointer"
            onClick={() => handleLikeCount("UP")}
          />
          <Text fontSize="9pt" fontWeight={600}>
            {likes}
          </Text>
          <Icon
            as={IoArrowDownCircleOutline}
            color="gray.400"
            cursor="pointer"
            onClick={() => handleDislikeCount("DOWN")}
          />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
