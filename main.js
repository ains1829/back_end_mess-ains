const bcrypt = require("bcryptjs");
const mdp = "jean_rakoto";
const hashedPassword = bcrypt.hash(mdp, 10);
hashedPassword.then((value) => console.log(value));
