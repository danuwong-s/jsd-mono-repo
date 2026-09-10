export const authUser = async (req, res, next)=> {
    let token = req.cookies.accessToken
    if (!token){
        return res
        .status(401)
        .json({ success: false, message: "Access dinied. No token!" });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      decodedToken.userId;
      req,user = {user: {_id: decodedToken.userId}};

      next();
    } catch (error) {
        next(err);
    }
};
