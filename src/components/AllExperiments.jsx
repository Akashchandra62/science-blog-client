import React, { useEffect, useState } from "react";
import ExperimentCard from "./ExperimentCard";
import { HStack, Select, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

const AllExperiments = () => {
  const [allExperiments, setAllExperiments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [subject, setSubject] = useState([]);

  const fetchData = async () => {
    let res = await axios.get(`https://science-blog.onrender.com?filter=${filter}`);
    setAllExperiments(res.data.data);
  };

  const fetchCoreData = async () => {
    const res = await axios.post(`https://science-blog.onrender.com/data`)
    setSubject(res.data.data.Subject);
    return;
  }

  useEffect(() => {
    fetchData();
    fetchCoreData()
  }, [filter]);

  return (
    <>
    <HStack w={'fit-content'} mx={'auto'} my={'20px'}>
        <Text>Subject </Text>
        <Select
         w={'fit-content'}
          value={filter}
          bg="tomato"
          borderColor="tomato"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          // color="white"
        >
          <option color="black" value="All">All</option>
          {
            subject.length >0 && (
              subject.map((list, i) => <option color="black" key={i} value={list}>{list}</option>)
            )
          }
        </Select>
    </HStack>
    <Stack
      direction={["column", "row"]}
      spacing="24px"
      flexWrap={"wrap"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"5"}
      marginBottom={"10"}
    >
      {allExperiments.length > 0 ? (allExperiments.map((exp) => {
        return (
          <ExperimentCard
            key={exp._id}
            ImgUrl={exp.mainImgUrl}
            title={exp.name}
            desc={exp.shortDescription}
            level={exp.level}
            id={exp._id}
          />
        );
      })) : <Text color={'red'} fontWeight={'bold'} fontSize={'20'}> No Experiment to show</Text>}
    </Stack>
    </>
  );
};

export default AllExperiments;
