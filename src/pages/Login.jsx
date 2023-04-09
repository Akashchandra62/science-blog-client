import { Button, Heading, Input, Stack, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        await axios.post("https://science-blog.onrender.com/login", {email, password});
        localStorage.setItem('email', email);
        navigate('/all-experiments')
    }
    

  return (
    <Stack w={'100vw'} h={'100vh'} bg={'whitesmoke'} alignItems={'center'} justifyContent={'center'}>

        <VStack w={'30%'}>
            <Heading>Login</Heading>
            <VStack gap={'3'} bg={'white'} w={'100%'} padding={'10px'}>
                <Input  placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} type='text' name='email' />
                <Input  type='password' name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button colorScheme='linkedin' onClick={handleSubmit}>Login</Button>
                <Button colorScheme='linkedin' onClick={() => {
                    setEmail('admin@gmail.com');
                    setPassword('admin')
                }}>Login As Admin</Button>
            </VStack>
        </VStack>

    </Stack>
  )
}

export default Login