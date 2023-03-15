const masks = {
  username: /^[a-zA-Z0-9]{4,16}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  displayName: /^[A-Z]{1}\w{2,10}\s{1}[A-Z]{1}\w{2,11}$/,
  email: /^[a-zA-Z\d]{1,15}@[a-z]{1,9}\.{1}([a-z]{2,4}){1}$/
};

const warns = {
  username: 'Username must be from 4 to 16 numbers of latin characters',
  password:
    'Your password must be 4-16 characters, and include at least one number.',
  displayName:
    'Enter your name and surname divided by space. First letters are capital :)',
  confirmPassword: 'Passwords should match',
  email: 'Enter your email'
};

const inputValidation = (string, name) => {
  const res = { message: '', isValidated: true, name: '' };

  // * if there is the name in masks and if it if not valid
  // * update result object and turn validation check to false

  if (name in masks && !masks[name].test(string)) {
    res.message = warns[name];
    res.name = name;
    res.isValidated = false;
  }

  return res;
};

const confirmValidation = (pass, confirmPassword) => {
  const res = { message: '', isValidated: true };

  if (pass !== confirmPassword) {
    res.message = warns.confirmPassword;
    res.isValidated = false;
  }

  return res;
};

const formValidation = (obj, type) => {
  const { password, username, displayName, email } = obj;
  const tempResult = [];
  const res = { data: null, isValidated: false };

  // * Switch/case has only one block... So 'else if'.
  if (type === 'signup') {
    const forValidation = { password, username, displayName, email };

    for (let item in forValidation) {
      tempResult.push(inputValidation(forValidation[item], item));
    }

    res.data = obj;
    res.isValidated = tempResult.every((result) => result.isValidated === true);

    return res;
  } else if (type === 'login') {
    const forValidation = { password, username };

    for (let item in forValidation) {
      tempResult.push(inputValidation(forValidation[item], item));
    }

    res.data = obj;
    res.isValidated = tempResult.every((result) => result.isValidated === true);

    return res;
  }

  return res;
};

export { formValidation, inputValidation, confirmValidation };
