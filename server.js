import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

// رابط لاستقبال التفويض
app.get("/aliexpress/callback", async (req, res) => {
  const code = req.query.code; // هذا الـ Authorization Code
  const state = req.query.state; // اختياري، للتحقق من الأمان

  if (!code) {
    return res.status(400).send("No authorization code received!");
  }

  try {
    // استبدال الـ Authorization Code بـ Access Token
    const response = await axios.post("https://gw.api.alibaba.com/openapi/http/1/system.oauth2/getToken/" , null, {
      params: {
        grant_type: "authorization_code",
        need_refresh_token: true,
        client_id: process.env.APP_KEY,
        client_secret: process.env.APP_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: code
      }
    });

    // البيانات المستلمة تحتوي على access_token و refresh_token
    const data = response.data;
    console.log("Access Token Data:", data);

    res.send("Authorization successful! Check server console for token.");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error fetching access token");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
