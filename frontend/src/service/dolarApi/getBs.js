import axios from "axios";

/**
 * Petición de información a la API sobre el precio del dólar oficial (BCV)
 */
export async function bsPrecio() {
  try {
    const response = await axios.get(
      "https://ve.dolarapi.com/v1/dolares/oficial",
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar la tasa del dólar:", error);
    return null;
  }
}

/**
 * Petición de información a la API sobre el precio del Euro oficial (BCV)
 */
export async function bsPrecioEu() {
  try {
    const response = await axios.get(
      "https://ve.dolarapi.com/v1/euros/oficial",
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar la tasa del dólar:", error);
    return null;
  }
}
