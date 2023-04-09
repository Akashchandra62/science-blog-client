import { Button, HStack, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [email, setEmail] = useState("");
  

  

  useEffect(() => {
    
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <HStack
      bg={"#f0ecf9"}
      w={"100%"}
      py={"5"}
      px={"12"}
      justifyContent={"space-between"}
    >
      <Heading>Admin</Heading>
      
      <HStack>
        <Link to={"/all-experiments"}>
          <Button colorScheme="messenger">All Experiments</Button>
        </Link>
        {email === "admin@gmail.com" && (
          <>
            <Link to={"/create-experiment"}>
              <Button colorScheme="whatsapp">Create Experiments</Button>
            </Link>
            <Link to={"/manage-coredata"}>
              <Button colorScheme="whatsapp">Manage Core Data</Button>
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
