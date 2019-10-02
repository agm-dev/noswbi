const { createRouter } = require("../domain/router");
const { googleLogin, googleLoginRedirect } = require("../config/passport");
const { generateJwt } = require("../utils/tokens");

const router = createRouter();

router.get("/login/google", googleLogin());
router.get("/login/google/callback", googleLoginRedirect(), (req, res) => {
  res.json({
    token: generateJwt(req.user.id, {})
  });
});

module.exports = router;
