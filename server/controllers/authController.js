import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
    try {
        console.log("Received body:", req.body); // Debugging

        if (!req.body) {
            return res.status(400).json({ success: false, error: "Request body is missing" });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY, // Ensure it's correctly set in .env
            { expiresIn: "10d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }

}
const verify = (req,res) =>
    {
        return res.status(200).json({success:true,user:req.user});
    }

export { login ,verify};
