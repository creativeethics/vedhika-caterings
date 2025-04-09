export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "breakfast", label: "Breakfast" },
    { id: "starters", label: "Starters" },
    { id: "bread", label: "Bread" },
    { id: "noodles", label: "Noodles" },
    { id: "rice", label: "Rice Items" },
    { id: "pulao", label: "Pulao" },
    { id: "biriyani", label: "Biriyani" },
    { id: "sweets", label: "Sweets" },
    { id: "beverage", label: "Hot Beverages" },
    { id: "juices", label: "Juices" },
    ],
  },
  {
    label: "Type Of Item",
    name: "order",
    componentType: "select",
    options: [
      { id: "catering", label: "Catering" },
    { id: "bulkorder", label: "Bulk Orders" },
    { id: "regular", label: "regular" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];



export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/home",
  },
  {
    id: "products",
    label: "Services",
    path: "/listing",
  },
 

  {
    id: "catering",
    label: "Catering",
    path: "/listing",
  },

  {
    id: "bulkorder",
    label: "Bulk Order",
    path: "/listing",
  },

  {
    id: "areas-we-serve",
    label: "Areas We Serve",
    path: "/areas-we-serve",
  },

  {
    id: "contact",
    label: "Contact",
    path: "/contact",
  },

  {
    id: "search",
    label: "Search",
    path: "/search",
  },

  
];

export const categoryOptionsMap = {
  breakfast: "Breakfast",
  starters: "Starters",
  bread: "Bread",
  noodles: "Noodles",
  rice: "rice items",
  pulao: "Pulao",
  biriyani: "Biriyani",
  sweets: "Sweets",
  beverage: "Hot Beverages",
  juices: "Juices",
};

export const orderOptionsMap = {
  catering: "Catering",
  bulkorder: "Bulk Order",
  regular: "Regular",
};

export const filterOptions = {
  category: [
    { id: "breakfast", label: "Breakfast" },
    { id: "starters", label: "Starters" },
    { id: "bread", label: "Bread" },
    { id: "noodles", label: "Noodles" },
    { id: "rice", label: "Rice Items" },
    { id: "pulao", label: "Pulao" },
    { id: "biriyani", label: "Biriyani" },
    { id: "sweets", label: "Sweets" },
    { id: "beverage", label: "Hot Beverages" },
    { id: "juices", label: "Juices" },
  ],
  order: [
    { id: "catering", label: "Catering" },
    { id: "bulkorder", label: "Bulk Orders" },
    { id: "regular", label: "Regular" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
