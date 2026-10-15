import axios from "axios";

/**
 * Optiene el balance del usuario
 */
export async function balance() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/balance`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
}

/**
 * Optiene las transactiones prosesada para el flujo
 */
export async function trans() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/trans`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
}
