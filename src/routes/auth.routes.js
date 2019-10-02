const { createRouter } = require("../domain/router");

const router = createRouter();

router.get("/login/google"); // TODO: complete
router.get("/login/google/callback"); // TODO: complete

module.exports = router;
