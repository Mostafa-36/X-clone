export const signup = async (formData) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data;
};

export const login = async (formData) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data;
};

export const logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data;
};

export const getMe = async () => {
  const data = await fetch("/api/auth/me");

  const res = await data.json();

  if (!data.ok) return null;

  return res.data.user;
};

export const getPosts = async (endPoint) => {
  const res = await fetch(`api/post/${endPoint}`);

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");
  return data.data.posts;
};

export const deletePostById = async (postId) => {
  const res = await fetch(`/api/post/${postId}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Something went very wrong!");
};

export const toggleLike = async (postId) => {
  const res = await fetch(`/api/post/${postId}/like`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return res.data;
};

export const createComment = async ({ postId, text }) => {
  const res = await fetch(`/api/post/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data.data.comment;
};

export const createPost = async (body) => {
  const res = await fetch("/api/post/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");
  return data.data.post;
};

export const getUserByProfile = async (userName) => {
  const res = await fetch("/api/user/profile/" + userName);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data.data.user;
};

export const toggleFollow = async (userId) => {
  const res = await fetch("/api/user/follow/" + userId, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data.data;
};

export const updateUser = async (body) => {
  const res = await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data.data;
};

export const getNotifications = async () => {
  const res = await fetch("/api/notifications/");
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data.data.notifications;
};

export const deleteNotifications = async () => {
  const res = await fetch("/api/notifications/", { method: "DELETE" });

  if (!res.ok) throw new Error("Something went very wrong!");
};

export const getSuggestedUsers = async () => {
  const res = await fetch("/api/user/suggested");

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went very wrong!");

  return data.data.suggestedUsers;
};
