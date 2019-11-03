const httpStatus = require("http-status");
const { createRouter } = require("../domain/router");

const router = createRouter();

router.get("/status", (req, res) => res.status(httpStatus.NO_CONTENT).send());

module.exports = router;
