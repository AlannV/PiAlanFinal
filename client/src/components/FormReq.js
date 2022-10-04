import { v4 as randomId } from "uuid";

const formReq = [
  {
    name: "name",
    initialState: "",
    label: "Name",
    type: "text",
    title: "instructions on hover",
    placeholder: "placeholder text...",
    id: randomId(),
    required: false,
  },

  {
    name: "weight",
    initialState: "",
    label: "Weight",
    type: "text",
    title: "instructions on hover",
    placeholder: "placeholder text...",
    id: randomId(),
    required: false,
  },
  {
    name: "height",
    initialState: "",
    label: "Height",
    type: "text",
    title: "instructions on hover",
    placeholder: "placeholder text...",
    id: randomId(),
    required: false,
  },
  {
    name: "life_span",
    initialState: "",
    label: "Life Span",
    type: "text",
    title: "instructions on hover",
    placeholder: "placeholder text...",
    id: randomId(),
    required: false,
  },
  {
    name: "image",
    initialState: [],
    label: "Image",
    type: "file",
    title: "instructions on hover",
    placeholder: "placeholder text...",
    id: randomId(),
    required: false,
  },
  {
    name: "temperament",
    initialState: [],
    label: "Temperament",
    type: "select",
    title: "instructions on hover",
    placeholder: "placeholder text...",
    id: randomId(),
    required: false,
    existingOptions: [],
  },
];

export default formReq;
