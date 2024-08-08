export const googleAuth = async () => {
  const response = await fetch("http://localhost:3000/api/auth/google");

  // data contains an object with the google url. I had problems with redirecting from the server.
  const data = await response.json();
  console.log(data);

  // Redirect to google login from the client instend.
  window.location.href = await data.url;
};
