import { Button, HStack, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const CoreData = () => {
    const [subject, setSubject] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = async (type, value) => {
        if(value === "") return alert("Enter Value to Add")
        const result = await axios.post("https://science-blog.onrender.com/add-data" , {
            type,
            value
        })
        return alert("Saved Successfully")
    }

  return (
    <VStack mt={'20px'} padding={'15px'} w={'50%'} mx={'auto'} bg={'whitesmoke'}>
        <VStack w={'80%'} mb={'15px'}>
            <Input bg={'white'}  type='text' value={subject} onChange={(e) => setSubject(e.target.value)}></Input>
            <Button colorScheme='whatsapp' onClick={() => handleSubmit("Subject", subject)}>Add Subject</Button>
        </VStack>
        <VStack w={'80%'}>
            <Input bg={'white'} type='text' value={category} onChange={(e) => setCategory(e.target.value)}></Input>
            <Button colorScheme='whatsapp' onClick={() => handleSubmit("Category", category)}>Add Category</Button>
        </VStack>
    </VStack>
  )
}

export default CoreData