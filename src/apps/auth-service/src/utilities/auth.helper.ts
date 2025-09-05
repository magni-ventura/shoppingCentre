import crypto from "crypto";
import { ValidationError } from "error-handler/src";
import redis from "../../../../packages/libs/redis";
import { sendEmail } from "./sendMail";

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate registration data
export const ValidationRegistrationData = (
  data: any,
  userType: "user" | "seller"
) => {
  const { name, email, password, phone_number, country } = data;

  if (
    !name ||
    !email ||
    !password ||
    (userType === "seller" && (!phone_number || !country))
  ) {
    throw new ValidationError("Missing required fields");
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format");
  }
};

// Check OTP restrictions
export const checkOtpRestrictions = async (email: string) => {
  if (await redis.get(`otp_lock:${email}`)) {
    throw new ValidationError(
      "Account locked due to multiple failed attempts! Try again after 30 minutes"
    );
  }

  if (await redis.get(`otp_spam_lock:${email}`)) {
    throw new ValidationError(
      "Too many OTP requests! Please wait 1 hour before sending a new request"
    );
  }

  if (await redis.get(`otp_cooldown:${email}`)) {
    throw new ValidationError(
      "OTP already sent! Please wait 1 minute before requesting again"
    );
  }
};

// Track OTP requests
export const trackOtpRequests = async (email: string) => {
  const otpRequestKey = `otp_request_count:${email}`;
  let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0", 10);

  if (otpRequests >= 2) {
    await redis.set(`otp_spam_lock:${email}`, "true", "EX", 3600); // 1 hour
    await redis.del(otpRequestKey);
    throw new ValidationError(
      "Too many OTP requests. Please wait 1 hour before the next request"
    );
  }

  await redis.set(otpRequestKey, (otpRequests + 1).toString(), "EX", 3600); // track for 1 hour
};

// Send OTP
export const sendOtp = async (name: string, email: string, template: string) => {
  const otp = crypto.randomInt(1000, 9999).toString();

  await sendEmail(email, "Verify your email", template, { name, otp });

  // Store OTP with expiry (5 mins)
  await redis.set(`otp:${email}`, otp, "EX", 60 * 5);

  // Set cooldown (1 min)
  await redis.set(`otp_cooldown:${email}`, "true", "EX", 60);

  return otp;
};
