import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  useQuery,
  List,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// import { auth, firestore } from "firebase-admin";
import { user } from "firebase-functions/v1/auth";
import { User } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import Link from "next/link";

type SearchInputProps = {
  user: User;
};
const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const [input, setInput] = useState<string>("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const filterData = communities.filter((item) =>
    item.id.toLowerCase().startsWith(input.toLowerCase())
  );

  const getCommunities = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc")
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      console.log("HERE ARE KHUBS", communities);

      setCommunities(communities);
    } catch (error: any) {
      console.log("getCommunities error", error.message);
    }
    setLoading(false);
  };

  const handleLinkClick = () => {
    setInput("");
  };

  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    getCommunities();
  }, []);

  useEffect(() => {
    // Add a click event listener to the document body
    document.body.addEventListener("click", closeDropdown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleInputClick = (e: { stopPropagation: () => void; }) => {
    // Prevent the click on the input from closing the dropdown
    e.stopPropagation();
  };

  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? "auto" : "600px"}
      mr={2}
      alignItems="center"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.400">
          <SearchIcon mb={2} />
        </InputLeftElement>
        <Input
          value={input}
          onClick={handleInputClick} // Prevent clicks on the input from closing the dropdown
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onFocus={() => setDropdownOpen(true)} // Open dropdown on input focus
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
        {isDropdownOpen && input && (
          <Box
            boxShadow="lg"
            bg="white"
            position="absolute"
            width="100%"
            mt={8}
            ref={dropdownRef}
          >
            <Box p={2} fontSize={15} borderBottom="1px solid #ccc">
              /r/Community
            </Box>
            <List styleType="none" p={0} m={0}>
              {filterData.map((item, index) => (
                <ListItem
                  key={index}
                  py={2}
                  px={4}
                  borderBottom="1px solid #ccc"
                  display="flex"
                  alignItems="center"
                >
                  <img
                    src={item.imageURL}
                    alt=""
                    style={{
                      marginRight: "8px",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <Link href={`/r/${item.id}`} onClick={handleLinkClick}>
                    {item.id}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
