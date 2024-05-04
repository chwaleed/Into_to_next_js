import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not exist" }, { status: 400 });
    }

    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { error: "Password is wrong." },
        { status: 400 }
      );
    }
    /// Create Token Data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // Creating Token
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
