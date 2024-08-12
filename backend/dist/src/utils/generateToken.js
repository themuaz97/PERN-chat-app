import token from "jsonwebtoken";
export const generateToken = (userId, res) => {
    const jwt = token.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.cookie("jwt", jwt, {
        httpOnly: true, // prevent XSS cors site scripting
        secure: process.env.NODE_ENV === "development", // became https
        sameSite: "strict", // prevent CSRF attack cross-site request forgery(CSRF)
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    });
    return jwt;
};
export default generateToken;
