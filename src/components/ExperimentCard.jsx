import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Badge } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const ExperimentCard = ({ImgUrl, title, desc, level, id}) => {
    level = parseInt(level);
  return (
    <Card maxW="sm" shadow={'2xl'} border={'1ps solid gray'}>
      <CardBody>
        <Image
          src={ImgUrl}
          alt="Img"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
            <HStack>
              <Heading size="md">{title}</Heading>
              <Badge variant='solid' colorScheme={level === 3 ? 'yellow' : (level < 3)? 'green' : 'red' }>{level === 3 ? 'Medium' : (level < 3)? 'Easy' : 'Hard' }</Badge>
            </HStack>
          <Text>
            {desc}
          </Text>
        </Stack>
        
      </CardBody>
      
      <Divider />
      <CardFooter>
          <Link to={`/experiment/${id}`}>
          <Button variant="solid" colorScheme="blue">
            Start Experiment
          </Button>
          </Link>
      </CardFooter>
    </Card>
  );
};

export default ExperimentCard;
