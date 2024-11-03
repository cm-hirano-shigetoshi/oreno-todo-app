import { memo, FC } from "react";
import { useDisclosure, Flex, Link, Box, Heading } from "@chakra-ui/react";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/menu/MenuDrawer";

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            TODOリスト
          </Heading>
        </Flex>
        <Flex
          align="cneter"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link>ユーザー一覧</Link>
          </Box>
          <Box pr={4}>
            <Link>設定</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
});
