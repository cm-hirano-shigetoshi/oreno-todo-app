import React from "react";
import { Box, Input, Text, VStack } from "@chakra-ui/react";

interface TaskcodeFilterProps {
  excludedTaskcodes: string;
  onExcludeChange: (value: string) => void;
}

export const TaskcodeFilter: React.FC<TaskcodeFilterProps> = ({
  excludedTaskcodes,
  onExcludeChange,
}) => {
  return (
    <Box bg="gray.50" p={4} borderRadius="md" mb={4}>
      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="semibold">
          非表示にするタスクコード
        </Text>
        <Input
          placeholder="除外したいタスクコードを入力（カンマ区切り）"
          value={excludedTaskcodes}
          onChange={(e) => onExcludeChange(e.target.value)}
          bg="white"
          size="sm"
        />
        <Text fontSize="xs" color="gray.600">
          例: ABC,DEF,GHI
        </Text>
      </VStack>
    </Box>
  );
};