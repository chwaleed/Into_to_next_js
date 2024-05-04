import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();
    console.log(saveUser);
    return NextResponse.json({ message: "User Created Successfuly." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function POST(request) {
//   try {
//     const reqBody = await request.json();
//     const { username, email, password } = reqBody;

//     const user = await User.findOne({ email });
//     if (user) {
//       return NextResponse.json(
//         { error: "User Already Exist" },
//         { status: 400 }
//       );
//     }
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();
//     console.log(savedUser);

//     //send verification email
//     return NextResponse.json({ message: "User Created Successfuly." });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
