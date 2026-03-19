import jwt from "jsonwebtoken";
//TODO: FALTA TESTEAR
export const generarToken = (payload, vida) => {
  const options = {
    expiresIn: vida,
  };
  return jwt.sign(payload, process.env.SALT, options);
};

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Token no proporcionado");
    }
    let tokenOk = jwt.verify(token, process.env.SALT);
    next();
  } catch (error) {
    res.status(401).send({
      status: "error",
      message: "Token invalido o expirado",
    });
  }
};
