const cloudinary = require("cloudinary").v2;
// require("../assets/image 2.jpg");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadImage = () => {
  cloudinary.uploader
    .upload(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8JdRMnRk5bywd6dU5jTRNaO1wi6oowpMj4HKxx0_RS5gvmB8b385Wws&s",
    )
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

module.exports = uploadImage;
