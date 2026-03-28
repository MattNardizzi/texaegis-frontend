const API_BASE = "http://127.0.0.1:8000";

export async function evaluateEmail(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE}/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = `Server error: ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          message = errorData.detail;
        }
      } catch {
        // keep fallback
      }

      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Check whether the backend is running.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}