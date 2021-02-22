const displayContent = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/profile") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Profile page</h1>");
    return res.end();
  }

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Homepage</h1>");
    return res.end();
  }

  if (url === "/settings" && method === "POST") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Form was submitted</h1>");
    return res.end();
  }

  if (url === "/settings") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<h1>Settings</h1><form action='/settings' method='POST'><input type='text'><button type='submit'>Submit</button></form>"
    );
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Page not found</h1><p>Error 404</p>");
  res.end();
};

module.exports = displayContent;
