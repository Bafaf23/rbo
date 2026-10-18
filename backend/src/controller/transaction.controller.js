import { Transaction } from "../model/Transaction.model.js";
import jwt from "jsonwebtoken";
import { conectDB, disconectDB } from "../../db.js";

export const create = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Sin informacion para continuar");
    return res.status(400).json({
      success: false,
      message: "No se encontro informacion para realizar el registro",
    });
  }

  try {
    await conectDB();

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No hay sesión activa",
      });
    }

    // Decodificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Crear y guardar documento
    const newTransaction = new Transaction({
      ...req.body,
      userId,
    });

    const savedTransaction = await newTransaction.save();
    console.log(`${userId}-${decoded.userName} registro un ${req.body.type}`);
    console.log("✅ Registro Exitoso en MongoDB ID:", savedTransaction._id);

    // NO llamar a disconectDB() aquí
    return res.status(201).json({
      success: true,
      message: "Registro procesado con éxito",
      data: savedTransaction,
    });
  } catch (e) {
    console.error("❌ Error registrando transacción:", e);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error intentando registrar la transacción",
      error: e.message,
    });
  } finally {
    await disconectDB();
  }
};

export const balance = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No hay sesión activa",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id || decoded._id;

  const inicioMes = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const finMes = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  );

  try {
    await conectDB();
    console.log("Generando Balance general");
    const transacciones = await Transaction.find({
      userId,
      date: { $gte: inicioMes, $lte: finMes },
    }).sort({ date: -1 });

    const ingresos = transacciones
      .filter((t) => t.type === "ingreso")
      .reduce((acc, t) => acc + (t.amountUsd || 0), 0);

    const egreso = transacciones
      .filter((t) => t.type === "egreso")
      .reduce((acc, t) => acc + (t.amountUsd || 0), 0);

    const deuda = 0;

    return res.status(200).json({
      success: true,
      data: {
        transacciones,
        totales: {
          ingresos,
          egreso,
          deuda,
          balanceTotal: ingresos - (egreso + deuda),
        },
      },
    });
  } catch (e) {
    console.error("❌ Error en balance:", e);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error en el servidor, reintenta",
      error: e.message,
    });
  } finally {
    await disconectDB();
  }
};

export const metric = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(500).json({
      success: false,
      message: "token ausente",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id || decoded._id;

  try {
    console.log("cargando...");
    const trans = await Transaction.find({ userId });

    const proceTrans = trans.reduce((acc, curr) => {
      const mes = new Date(curr.date).toLocaleDateString("es-VE", {
        month: "long",
      });

      if (!acc[mes]) {
        acc[mes] = { mes: mes, ingresos: 0, egresos: 0, deuda: 0 };
      }

      if (curr.type === "ingreso") {
        acc[mes].ingresos = curr.amountUsd + acc[mes].ingresos;
      }
      if (curr.type === "egreso") {
        acc[mes].egresos = curr.amountUsd + acc[mes].egresos;
      }
      if (curr.type === "deuda") {
        acc[mes].deuda = curr.amountUsd + acc[mes].deuda;
      }

      return acc;
    }, {});

    const listMes = Object.entries(proceTrans).map(([nombreMes, datos]) => ({
      mes: nombreMes,
      ...datos,
    }));
    console.log(listMes);
    console.log("exito");
    return res.status(200).json({
      success: true,
      data: listMes,
    });
  } catch (error) {
    console.error(error);
  }
};
