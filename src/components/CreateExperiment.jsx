import {
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: "80%",
  border: "1px solid grey",
  padding: "5px",
  outline: "none",
  borderRadius: "5px",
};

const CreateExperiment = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    level: "",
    subject: "Physics",
    mainImg: "",
    mainImgUrl: "",
    materialLists: [],
    safety: [],
    instructions: [],
  });

  const [item, setItem] = useState("");
  const [safety, setSafety] = useState("");
  const [subject, setSubject] = useState([]);
  const [category, setCategory] = useState([]);
  const [instruction, setInstruction] = useState({
    img: "",
    imgUrl: "",
    step: "",
  });
  const fetchCoreData = async () => {
    const res = await axios.post("http://localhost:8080/data")
    setSubject(res.data.data.Subject);
    setCategory(res.data.data.Category);
    return;
  }

  useEffect(() => {
    fetchCoreData();
  }, [])

  const uploadImg = async (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "socialMedia-app");
    data.append("cloud_name", "dpinesgrm");
    let res = await axios.post(
      "https://api.cloudinary.com/v1_1/dpinesgrm/image/upload",
      data
    );
    return res.data.url;
  };

  const handleChange = async (e) => {
    if (e.target.name === "mainImg") {
      setForm({ ...form, ["mainImg"]: e.target.files[0] });
      let url = await uploadImg(e.target.files[0]);
      console.log(url);
      setForm({ ...form, ["mainImgUrl"]: url });
    } else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    form.instructions.map(async (list) => {
      if (list.img) {
        let newUrl = await uploadImg(list.img);
        list["imgUrl"] = newUrl;
      }
    });
    const res = await axios.post("http://localhost:8080", { form });
    alert("Experiment created successfully");
    navigate("/all-experiments");
  };
  

  
  

  return (
    <Box
      w={["100%", "80%"]}
      border={"1px solid grey"}
      borderRadius={"10px"}
      p={"7"}
      mx={"auto"}
      my={"15px"}
    >
      <Text fontSize={"25px"} textAlign={"center"}>
        Create Experiment
      </Text>
      <VStack mt={"10px"}>
        <FormControl>
          <VStack alignItems={"self-start"}>
            <label htmlFor="name" style={{ fontWeight: "bold" }}>
              Experiment Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={inputStyle}
              placeholder={form.name}
              onChange={handleChange}
            ></input>
          </VStack>
          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="shortDescription" style={{ fontWeight: "bold" }}>
              Short Description{" "}
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              style={inputStyle}
              placeholder={form.shortDescription}
              onChange={handleChange}
            ></input>
            <Text color={"gray.500"} fontWeight={"normal"} fontSize={"12px"}>
              **Provide description in One Line**
            </Text>
          </VStack>
          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="level" style={{ fontWeight: "bold" }}>
              Difficulty Level
            </label>
            <input
              type="number"
              id="level"
              name="level"
              style={inputStyle}
              min="1"
              max="5"
              placeholder={form.level}
              onChange={handleChange}
            />
            <Text color={"gray.500"} fontWeight={"normal"} fontSize={"12px"}>
              **On Scale of 5**
            </Text>
          </VStack>
          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="level" style={{ fontWeight: "bold" }}>
              Subject
            </label>
            <select name="subject" style={inputStyle} onChange={handleChange}>
              {
                subject.length >0 && (
                  subject.map((list, i) => <option value={list} key={i}>{list}</option>)
                )
              }
            </select>
          </VStack>

          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="level" style={{ fontWeight: "bold" }}>
              Main Image
            </label>
            <input type="file" name="mainImg" onChange={handleChange}></input>
          </VStack>

          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="lists" style={{ fontWeight: "bold" }}>
              Material Lists
            </label>
            {form.materialLists.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: "5px",
                }}
              >
                {form.materialLists.map((list, i) => (
                  <li key={i}>{`${i + 1}. ${list}`}</li>
                ))}
              </ul>
            )}
            <HStack w={"100%"}>
              <input
                type="text"
                id="lists"
                style={{ ...inputStyle, width: "75%" }}
                name="materialLists"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              ></input>
              <Button
                colorScheme="whatsapp"
                onClick={() => {
                  let newList = [...form.materialLists, item];
                  setForm({ ...form, ["materialLists"]: newList });
                  setItem("");
                }}
              >
                Add
              </Button>
            </HStack>
          </VStack>

          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="safety" style={{ fontWeight: "bold" }}>
              Safety Precautions
            </label>
            {form.safety.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: "5px",
                }}
              >
                {form.safety.map((list, i) => (
                  <li key={i}>{`${i + 1}. ${list}`}</li>
                ))}
              </ul>
            )}
            <HStack w={"100%"}>
              <input
                type="text"
                style={{ ...inputStyle, width: "75%" }}
                name="safety"
                value={safety}
                onChange={(e) => setSafety(e.target.value)}
              ></input>
              <Button
                colorScheme="whatsapp"
                onClick={() => {
                  let newList = [...form.safety, safety];
                  setForm({ ...form, ["safety"]: newList });
                  setSafety("");
                }}
              >
                Add
              </Button>
            </HStack>
          </VStack>

          <VStack alignItems={"self-start"} mt={"3"}>
            <label htmlFor="instructions" style={{ fontWeight: "bold" }}>
              Step-By-Step Instructions
            </label>
            {form.instructions.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: "5px",
                }}
              >
                {form.instructions.map((list, i) => {
                  return (
                    <li key={i}>
                      <VStack mb={"3"} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"}>{`Step-${i + 1}`}</Text>
                        {list["imgUrl"] && (
                          <Image
                            boxSize="200px"
                            src={list["imgUrl"]}
                            alt="Experiment IMG"
                          />
                        )}
                        <p>{`${list["step"]}`}</p>
                      </VStack>
                    </li>
                  );
                })}
              </ul>
            )}
            <VStack w={"100%"} alignItems={"flex-start"}>
              <input
                type="file"
                onChange={async(e) => {
                  let url = await uploadImg(e.target.files[0])
                  setInstruction({
                    ...instruction,
                    ["imgUrl"]: url,
                    ["img"]: e.target.files[0],
                  });
                }}
              ></input>
              <input
                type="text"
                style={{ ...inputStyle, width: "75%" }}
                value={instruction["step"]}
                onChange={(e) =>
                  setInstruction({ ...instruction, ["step"]: e.target.value })
                }
              ></input>
              <Button
                colorScheme="whatsapp"
                onClick={() => {
                  let newList = [...form.instructions, instruction];
                  setForm({ ...form, ["instructions"]: newList });
                  setInstruction({
                    img: "",
                    step: "",
                    imgUrl: "",
                  });
                }}
              >
                Add Step
              </Button>
            </VStack>
            <Button colorScheme="red" onClick={handleSubmit}>
              Submit Experiment
            </Button>
          </VStack>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default CreateExperiment;
