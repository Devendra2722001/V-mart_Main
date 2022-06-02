export const addAddressValidation = (address) => {

  let error = { address };
  if (!address.addline1) {
    error.addline1 = "* Please enter full address";
  }
  if (!address.addline2) {
    error.addline2 = "* Please select address type.";
  }
  if (!address.city) {
    error.city = "* Please enter city.";
  }
  if (!address.district) {
    error.district = "* Please enter district.";
  }
  if (!address.state) {
    error.state = "* Please enter state.";
  }
  if (!address.zipCode) {
    error.zipCode = "* Please enter zipCode.";
  }
  else if (address.zipCode.length > 6 || address.zipCode.length < 6) {
    error.zipCode = "* Zipcode contain six digits."
  }
  if (isNaN(address.zipCode)) {
    error.zipCode = "* ZipCode contain only digits."
  }

  return error;
}

export const changPasswordValidation = (data) => {
   
  let error = {};
  if(!data.oldPassword) {
    error.oldPassword = "* Please enter old password.";
  }
  if(!data.newPassword) {
    error.newPassword = "* Please enter new password.";
  }
  if (data.newPassword.length < 8) {
    error.newPassword = "* Minimum length of password should be 8 characters.";
  }
  if(!data.confirmPassword) {
    error.confirmPassword = "* Please confirm new password.";
  }
  if (data.confirmPassword !== data.newPassword) {
    error.confirmPassword = "* password and confirm password does not match.";
  }

  return error;
}

export const editAddressValidation = (address) => {

  let error = {};
  if (!address.addressLine1) {
    error.addline1 = "* Please enter address line-1."
  }
  if (!address.addressLine2) {
    error.addline2 = "* Please enter address line-2."
  }
  if (!address.cityName) {
    error.city = "* Please enter city."
  }
  if (!address.district) {
    error.district = "* Please enter district."
  }
  if (!address.state) {
    error.state = "* Please enter state."
  }
  if (!address.zipCode) {
    error.zipCode = "* Please enter zipCode."
  }
  else if (address.zipCode.length > 6 || address.zipCode.length < 6) {
    error.zipCode = "* Zipcode contain six digits."
  }
  if (isNaN(address.zipCode)) {
    error.zipCode = "* ZipCode contain only digits."
  }

  return error;
}

export const emailValidation = (email) => {
  let error = {};
  if (!email.emailID) {
    error.email = "* to get otp, email must required.";
  }
  return error;
};

export const emailVerificationValidation = (OTP) => {
  let error = {};
  if (!OTP.otp) {
    error.otp = "* enter otp.";
  }
  return error;
};

export const loginValidation = (credentials) => {
  let error = {};
  if (!credentials.email) {
    error.email = "* email must required.";
  }
  if (!credentials.password) {
    error.password = "* password must required.";
  }
  return error;
};
export const resetPasswordValidation = (data) => {
  let error = {};
  if (!data.email) {
    error.email = "* Email must required.";
  }
  if (!data.otp) {
    error.otp = "* otp must required.";
  }
  if (!data.password) {
    error.password = "* password must required.";
  } else if (data.password.length < 8) {
    error.password = "* Minimum length of password is 8 charecter.";
  }
  if (!data.conPassword) {
    error.conPassword = "* confirm password must required.";
  } else if (data.password !== data.conPassword) {
    error.conPassword = "* Password and Confirm password not match.";
  }
  return error;
};

export const  signUpValidation = (user) => {

  let error={};

  if(!user.fname){
      error.fname = "* First name must required."
  }
  if(!user.lname){
      error.lname = "* Last name must required."
  }
  if(!user.email){
      error.email = "* Email must required."
  }
  if(!user.password){
      error.password = "* Password must required."
  }
  else if(user.password.length < 8){
      error.password = "* Minimum length of password is 8 charecter."
  }
  if(!user.cpassword){
      error.cpassword = "* Confirm password must required."
  }
  else if(user.cpassword !== user.password){
      error.cpassword = "* Password and Confirm password not match."
  }
return error;
}

export const vendorSignupValidation = (user) => {

  let error={};

  if(!user.fname){
      error.fname = "* First name must required."
  }
  if(!user.lname){
      error.lname = "* Last name must required."
  }
  if(!user.email){
      error.email = "* Email must required."
  }
  if(!user.password){
      error.password = "* Password must required."
  }
  else if(user.password.length < 8){
      error.password = "* Minimum length of password is 8 charecter."
  }
  if(!user.cpassword){
      error.cpassword = "* Confirm password must required."
  }
  else if(user.cpassword !== user.password){
      error.cpassword = "* Password and Confirm password not match."
  }
return error;
}

export const addProductValidation = (name, description, price, stock, brand, image1, image2, image3, image4, category, RAM, batteryCapacity, screenSize, networkType, resolutionType, camera, processor, hardDisk, touchScreen, gender, size, colour) => {
  let error = {};
  if (!name) {
    error.name = "* product name is required.";
  }
  if (!description) {
    error.description = "* product description is required.";
  }
  if (!price) {
    error.price = "* product price is required.";
  }
  else if (isNaN(price)) {
    error.price = "* product price is only accepted in digit(s). ";
  }
  if (!stock) {
    error.stock = "* product stock is required.";
  }
  else if (isNaN(stock)) {
    error.stock = "* product stock is only accepted in digit(s).";
  }
  if (!brand) {
    error.brand = "* product brand is required.";
  }
  if (!image1) {
    error.image1 = "* product image 1 is required.";
  }
  if (!image2) {
    error.image2 = "* product image 2 is required.";
  }
  if (!image3) {
    error.image3 = "* product image 3 is required.";
  }
  if (!image4) {
    error.image4 = "* product image 4 is required.";
  }
  if (!category) {
    error.category = "* selecting product category is required.";
  }
  if (!RAM) {
    error.RAM = "* required.";
  }
  else if (isNaN(RAM)) {
    error.RAM = "* only accepted in digit(s). ";
  }
  if (!batteryCapacity) {
    error.batteryCapacity = "* required.";
  }
  else if (isNaN(batteryCapacity)) {
    error.batteryCapacity = "* only accepted in digit(s). ";
  }
  if (!screenSize) {
    error.screenSize = "* required.";
  }
  else if (isNaN(screenSize)) {
    error.screenSize = "* only accepted in digit(s) or decimals. ";
  }
  if (!networkType) {
    error.networkType = "* required.";
  }
  if (!resolutionType) {
    error.resolutionType = "* required.";
  }
  else if (isNaN(resolutionType)) {
    error.resolutionType = "* only accepted in digit(s). ";
  }
  if (!camera) {
    error.camera = "* required.";
  }
  else if (isNaN(camera)) {
    error.camera = "* only accepted in digit(s). ";
  }
  else if (isNaN(camera)) {
    error.camera = "* only accepted in digit(s). ";
  }
  if (!processor) {
    error.processor = "* required.";
  }
  if (!hardDisk) {
    error.hardDisk = "* required.";
  }
  else if (isNaN(hardDisk)) {
    error.hardDisk = "* only accepted in digit(s). ";
  }
  if (!touchScreen) {
    error.touchScreen = "* required.";
  }
  if (!gender) {
    error.gender = "* gender is required.";
  }
  if (!size) {
    error.size = "* shose size is required.";
  }
  else if (isNaN(size)) {
    error.size = "* only accepted in digit(s). ";
  }
  if (!colour) {
    error.colour = "* shose colour is required.";
  }
  else if (!isNaN(colour)) {
    error.colour = "* enter valid colour name. ";
  }
  
  return error;
};

export const updateProductValidation = (name, description, price, stock, brand, image1, image2, image3, image4, category, RAM, batteryCapacity, screenSize, networkType, resolutionType, camera, processor, hardDisk, touchScreen, gender, size, colour) => {
  let error = {};
  if (!name) {
    error.name = "* product name is required.";
  }
  if (!description) {
    error.description = "* product description is required.";
  }
  if (!price) {
    error.price = "* product price is required.";
  }
  else if (isNaN(price)) {
    error.price = "* product price is only accepted in digit(s). ";
  }
  if (!stock) {
    error.stock = "* product stock is required.";
  }
  else if (isNaN(stock)) {
    error.stock = "* product stock is only accepted in digit(s).";
  }
  if (!brand) {
    error.brand = "* product brand is required.";
  }
  // if (!image1) {
  //   error.image1 = "* product image 1 is required.";
  // }
  // if (!image2) {
  //   error.image2 = "* product image 2 is required.";
  // }
  // if (!image3) {
  //   error.image3 = "* product image 3 is required.";
  // }
  // if (!image4) {
  //   error.image4 = "* product image 4 is required.";
  // }
  if (!category) {
    error.category = "* selecting product category is required.";
  }
  if (!RAM) {
    error.RAM = "* required.";
  }
  else if (isNaN(RAM)) {
    error.RAM = "* only accepted in digit(s). ";
  }
  if (!batteryCapacity) {
    error.batteryCapacity = "* required.";
  }
  else if (isNaN(batteryCapacity)) {
    error.batteryCapacity = "* only accepted in digit(s). ";
  }
  if (!screenSize) {
    error.screenSize = "* required.";
  }
  else if (isNaN(screenSize)) {
    error.screenSize = "* only accepted in digit(s) or decimals. ";
  }
  if (!networkType) {
    error.networkType = "* required.";
  }
  if (!resolutionType) {
    error.resolutionType = "* required.";
  }
  else if (isNaN(resolutionType)) {
    error.resolutionType = "* only accepted in digit(s). ";
  }
  if (!camera) {
    error.camera = "* required.";
  }
  else if (isNaN(camera)) {
    error.camera = "* only accepted in digit(s). ";
  }
  else if (isNaN(camera)) {
    error.camera = "* only accepted in digit(s). ";
  }
  if (!processor) {
    error.processor = "* required.";
  }
  if (!hardDisk) {
    error.hardDisk = "* required.";
  }
  else if (isNaN(hardDisk)) {
    error.hardDisk = "* only accepted in digit(s). ";
  }
  if (!touchScreen) {
    error.touchScreen = "* required.";
  }
  if (!gender) {
    error.gender = "* gender is required.";
  }
  if (!size) {
    error.size = "* shose size is required.";
  }
  else if (isNaN(size)) {
    error.size = "* only accepted in digit(s). ";
  }
  if (!colour) {
    error.colour = "* shose colour is required.";
  }
  else if (!isNaN(colour)) {
    error.colour = "* enter valid colour name. ";
  }
  
  return error;
};