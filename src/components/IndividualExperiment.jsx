import {
  Box,
  HStack,
  Heading,
  Image,
  
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Navbar from "./Navbar";

const IndividualExperiment = () => {
  const [experiment, setExperiment] = useState({});
  const { id } = useParams()

  const fetchData = async () => {
    let res = await axios.get(`http://localhost:8080/${id}`);
    setExperiment(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <Box border={"1px solid black"} p={"5"} w={"80%"} mx={"auto"} my={'15px'}>
      <Heading color={"red"} textAlign={"center"} mb={"3"}>
        {experiment.name}
      </Heading>
      <Image mx={"auto"} height='300px' w={'500px'}  bg={"green"} src={experiment.mainImgUrl}></Image>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight={"bold"} color={"blue"} fontSize={"25"}>
          Description
        </Text>
        <Text>{experiment.shortDescription}</Text>
      </VStack>
      <VStack alignItems={"flex-start"} my={"5"}>
        <Text fontWeight={"bold"} color={"blue"} fontSize={"25"}>
          Materials Required
        </Text>
        <ul style={{ listStyle: "none" }}>
          <li>1. FIrst List item</li>
          <li>2. Second List item</li>
          <li>3. Third List item</li>
        </ul>
      </VStack>
      <VStack alignItems={"flex-start"} my={"5"}>
        <Text fontWeight={"bold"} color={"blue"} fontSize={"25"}>
          Precautions Measure
        </Text>
        <ul style={{ listStyle: "none" }}>
          {experiment.materialLists?.map((list, i) => (
            <li key={i}>
              {i + 1}. {list}
            </li>
          ))}
        </ul>
      </VStack>
      <VStack alignItems={"flex-start"} my={"5"}>
        <Text fontWeight={"bold"} color={"blue"} fontSize={"25"}>
          Step-By-Step Procedure
        </Text>
        <ul style={{ listStyle: "none" }}>
          {experiment.instructions?.map((list, i) => (
            <li key={i}>
              <VStack alignItems={"flex-start"} mb={"5"}>
                <Text fontWeight={"bold"}>Step {i + 1}</Text>
                {list.imgUrl && <Image maxHeight='300px' maxWidth={'500px'} src={list.imgUrl}></Image>}
                <Text>{list.step}</Text>
              </VStack>
            </li>
          ))}
        </ul>
      </VStack>
      <HStack fontWeight={"bold"} justifyContent={"center"} mt={'20'}>
        <Text>** End of Experiment **</Text>
      </HStack>
    </Box>
    </>
  );
};

export default IndividualExperiment;
