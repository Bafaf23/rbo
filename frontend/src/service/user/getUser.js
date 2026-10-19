import axios from "axios";
/**
 * Obtiene toda la imformacion del usario
 *
 */
export async function getUser() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (e) {
    console.error("Error al crear el usuario:", e);
    return e.response.data;
  }
}
