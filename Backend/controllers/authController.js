const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const transporter = require("../config/nodemailer.config.js");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing details!" });
    }

    try {
        const isUserExsists = await userModel.findOne({ email });

        if (isUserExsists) {
            return res.json({
                success: false,
                message: "User Already Exxists! please login",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Sending the welcome Email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to the Community Service Exchange",
            text: `Hello ${name},\n\nThank you for registering with us! We are excited to have you on board.`,
            html: `
        <h1>Welcome to Community Service Exchange</h1>
        <p>Hello ${name},</p>
        <p>Thank you for registering with us! We are excited to have you on board.</p>
        <p>You're account has been created using the email: ${email}</p>
    `,
        });

        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Missing details!" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User Doesn't exsists",
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.json({
                success: false,
                message: "Invalid email or password!",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({ success: true, message: "login Succesfull" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ success: true, message: "logout Succesfull" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Sending the verification Email
const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }

        if (user.isAccountVerified) {
            return res.json({
                success: false,
                message: "user is already verified",
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify Your Account",
            html: `
                <h1>Verify Your Account</h1>
                <p>Hello ${user.name},</p>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>This code is valid for 10 minutes.</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Verify the OTP
const verifyOtp = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request!" });
    }
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }

        if (user.verifyOtp !== otp || user.verifyOtp === "") {
            // If the OTP is incorrect or not set
            return res
                .status(400)
                .json({ success: false, message: "Invalid OTP!" });
        }

        if (user.verifyOtpExpiresAt < Date.now()) {
            return res
                .status(410)
                .json({ success: false, message: "OTP has expired!" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpiresAt = 0;
        await user.save();
        return res.status(200).json({ success: true, message: "OTP Verified" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// verify user is logged in
const isLoggedIn = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "User is logged in" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//reset Password
const resetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res
            .status(401)
            .json({ success: false, mwssage: "Missing details!" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User doesn't exist!" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            html: `
                <h1>Verify Your Account</h1>
                <p>Hello ${user.name},</p>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>This code is valid for 10 minutes.</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Reset the password using the OTP
const resetPassword = async (req, res) => {
    const { userId, otp, newPassword } = req.body;
    // const { email, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request!" });
    }

    // if (!email || !otp || !newPassword) {
    //     return res
    //         .status(400)
    //         .json({ success: false, message: "Invalid request!" });
    // }

    try {
        const user = await userModel.findById(userId);
        // const user = await userModel.findOne({email});

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }

        if (user.resetOtp !== otp || user.resetOtp === "") {
            return res
                .status(400)
                .json({ success: false, message: "Invalid OTP!" });
        }

        if (user.resetOtpExpiresAt < Date.now()) {
            return res
                .status(410)
                .json({ success: false, message: "OTP has expired!" });
        }

        const isMatch = await bcrypt.compare(user.password, newPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be same as old password!",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpiresAt = 0;
        await user.save();

        return res
            .status(200)
            .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyOtp,
    isLoggedIn,
    resetOtp,
    resetPassword,
};
