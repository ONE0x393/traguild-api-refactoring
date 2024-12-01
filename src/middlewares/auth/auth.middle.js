const userInfoService = require("../../services/00-userInfo/userInfoService");
const logger = require("../../config/winston/logger");
const requestIp = require("request-ip");
const bcrypt = require("bcrypt");

exports.checkValidPW = async (req, res, next) => {
  try {
    logger.info(`${requestIp.getClientIp(req)} Middleware("checkValidPW")`);
    const body = req.body;
    if(!user_pw) next();

    const { user_pw } = body?.user_idx
      ? await userInfoService.getUser(body.user_idx)
      : await userInfoService.getUserInfoById(body.user_id);

    try {
      const isValid = await bcrypt.compare(body.user_pw, user_pw);
      
      if (isValid) next();
      else return res.status(400).json({ message: "기존 비밀번호가 일치하지 않습니다." });
    } catch (error) {
      logger.error(`${requestIp.getClientIp(req)} Middleware("checkValidPW") 500 ERROR: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  } catch (e) {
    logger.error(`${requestIp.getClientIp(req)} Middleware("checkValidPW") 500 ERROR: ${e.message}`);
    res.status(500).json({ message: e.message });
  }
};

exports.checkValidID = async (req, res, next) => {
  try {
    logger.info(`${requestIp.getClientIp(req)} Middleware("checkValidID")`);
    const body = req.body;
    const user = await userInfoService.getUserInfoById(body.user_email);

    if(user) return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    else next();
    
  } catch (e) {
    logger.error(`${requestIp.getClientIp(req)} Middleware("checkValidID") 500 ERROR: ${e.message}`);
    res.status(500).json({ message: e.message });
  }
};