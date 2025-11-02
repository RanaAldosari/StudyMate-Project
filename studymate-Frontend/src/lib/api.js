const BASE_URL = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000").replace(/\/+$/, "");

function buildUrl(path, params) {
  const url = new URL(`${BASE_URL}${path}`);
  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      const stringValue = String(value ?? "").trim();
      if (stringValue !== "") url.searchParams.append(key, stringValue);
    });
  }
  return url.toString();
}

async function extractErrorMessage(response) {
  let message = `HTTP ${response.status}`;
  try {
    const data = await response.json();
    if (data?.detail) message = data.detail;
    else if (data?.message) message = data.message;
  } catch {
  }
  return message;
}

async function getJson(path, params) {
  const url = buildUrl(path, params);
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(await extractErrorMessage(response));
  return response.json();
}

async function postJson(path, payload) {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload ?? {}),
  });
  if (!response.ok) throw new Error(await extractErrorMessage(response));
  return response.json();
}

export const api = {
  listCourses: (params) => getJson("/api/courses", params),
  courseById: (id) => getJson(`/api/courses/${id}`),

  categoryStats: () => getJson("/api/courses/categories"),

  aiChat: ({ message, user_id = "web-user", course_context = null }) =>
    postJson("/api/ai/chat", { message, user_id, course_context }),
};

export { getJson, postJson, buildUrl, BASE_URL };
