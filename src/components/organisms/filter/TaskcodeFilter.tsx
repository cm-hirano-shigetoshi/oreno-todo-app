import React from "react";
import { Box, Input, InputGroup, InputRightElement, IconButton, Tooltip } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface TaskcodeFilterProps {
  filterTaskcodes: string;
  isExcludeMode: boolean;
  onFilterChange: (value: string) => void;
  onModeChange: (isExclude: boolean) => void;
}

export const TaskcodeFilter: React.FC<TaskcodeFilterProps> = ({
  filterTaskcodes,
  isExcludeMode,
  onFilterChange,
  onModeChange,
}) => {
  return (
    <Box bg="gray.50" p={2} borderRadius="md" mb={2} width="60%">
      <InputGroup size="md">
        <Input
          placeholder="フィルターしたいタスクコードを入力（カンマ区切り）"
          value={filterTaskcodes}
          onChange={(e) => onFilterChange(e.target.value)}
          bg="white"
          pr="50px"
          height="40px"
        />
        <InputRightElement width="50px" height="40px">
          <Tooltip 
            label={isExcludeMode ? "該当するものは非表示" : "該当するもののみ表示"}
            fontSize="xs"
          >
            <IconButton
              aria-label="フィルターモード切り替え"
              icon={isExcludeMode ? <ViewOffIcon /> : <ViewIcon />}
              size="sm"
              variant="ghost"
              colorScheme={isExcludeMode ? "red" : "blue"}
              onClick={() => onModeChange(!isExcludeMode)}
            />
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};