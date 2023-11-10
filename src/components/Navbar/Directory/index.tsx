import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuListOpen, setMenuListOpen] = useState(false);

  // Function to close the menu
  const closeMenu = () => {
    toggleMenuOpen();
  };

  // Function to toggle the MenuList
  const toggleMenuList = () => {
    setMenuListOpen(!isMenuListOpen);
  };
  // Add an event listener to the document body to handle clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isMenuListOpen // Only close the MenuList if it's open
      ) {
        toggleMenuOpen(); // Close the menu
        // setMenuListOpen(false); // Close the MenuList
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuListOpen, toggleMenuOpen]);
  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius="4px"
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={() => {
              toggleMenuList(); // Toggle the MenuList
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={{ base: "auto", lg: "200px" }}
            >
              <Flex alignItems="center">
                <>
                  {directoryState.selectedMenuItem.imageURL ? (
                    <Image
                      borderRadius="full"
                      boxSize="24px"
                      src={directoryState.selectedMenuItem.imageURL}
                      mr={2}
                    />
                  ) : (
                    <Icon
                      fontSize={24}
                      mr={{ base: 1, md: 2 }}
                      color={directoryState.selectedMenuItem.iconColor}
                      as={directoryState.selectedMenuItem.icon}
                    />
                  )}
                  <Box
                    display={{ base: "none", lg: "flex" }}
                    flexDirection="column"
                    fontSize="10pt"
                  >
                    <Text fontWeight={600}>
                      {directoryState.selectedMenuItem.displayText}
                    </Text>
                  </Box>
                </>
              </Flex>
              <ChevronDownIcon color="gray.500" />
            </Flex>
          </MenuButton>
          {isMenuListOpen && (
            <MenuList
              maxHeight="300px"
              overflow="scroll"
              overflowX="hidden"
              ref={menuRef}
            >
              <Communities menuOpen={isOpen} />
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
};
export default Directory;
