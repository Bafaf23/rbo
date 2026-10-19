import { conectDB, disconectDB } from "../../db.js";
import { User } from "../model/User.model.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  if (!req.body) {
    return res.status(404).json({
      success: false,
      message:
        "No se encontro informacion para ralizar el registro, intenta de nuevo",
    });
  }

  try {
    await conectDB();
    const { email } = req.body;

    if (email) {
      const existingUser = await User.findOne({
        email: email.trim().toLowerCase(),
      });
      if (existingUser) {
        console.log("El usuairo ya esta registrado", existingUser);
        await disconectDB();
        return res.status(200).json({
          success: false,
          message: "Ya te encunetras registrado, inicia secion en su lugar.",
        });
      }
    }

    const newUser = new User(req.body);
    await newUser.save();

    console.log("Registro Exitoso");
    await disconectDB();

    return res.status(201).json({
      success: true,
      message: "Registro procesado con éxito",
    });
  } catch (e) {
    throw console.log(e);
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "El correo electrónico ya está registrado por otro usuario.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al registrar el usuario",
    });
  }
};

export const getInfoUser = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No hay sesión activa",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id || decoded._id;

  try {
    await conectDB();
    const user = await User.findById(userId);
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
