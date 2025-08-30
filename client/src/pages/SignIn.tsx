import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "jonas_kahnwald@gmail.com",
    otp: "",
    keepLoggedIn: false,
  });

  const handleSignIn = () => {
    console.log("Sign in with:", formData);
    // Navigate to dashboard after sign in
    navigate("/dashboard");
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
  };

  return (
    <div className="flex w-full max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] min-h-[600px] mx-auto bg-white rounded-[32px] overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col flex-1 p-8">
        {/* Logo */}
        <div className="flex flex-col gap-[10px] mb-8">
          <svg
            width="79"
            height="32"
            viewBox="0 0 79 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex items-center gap-3"
          >
            <path
              d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
              fill="#367AFF"
            />
            <path
              d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z"
              fill="#367AFF"
            />
            <path
              d="M20.6871 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6871 20.8292Z"
              fill="#367AFF"
            />
            <path
              d="M17.6481 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8273 22.705 14.2723 22.5523L11.9588 31.1569L15.1159 32L17.6481 22.5819Z"
              fill="#367AFF"
            />
            <path
              d="M14.1607 22.5205C13.0533 22.1945 12.0683 21.584 11.2909 20.7739L4.92328 27.1199L7.23448 29.4233L14.1607 22.5205Z"
              fill="#367AFF"
            />
            <path
              d="M11.2378 20.7178C10.4737 19.9026 9.91721 18.8917 9.65231 17.7688L0.855743 20.1179L1.7017 23.2643L11.2378 20.7178Z"
              fill="#367AFF"
            />
            <text
              fill="#232323"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Inter"
              fontSize="24"
              fontWeight="600"
              letterSpacing="-0.04em"
            >
              <tspan x="44.355" y="24.7273">
                HD
              </tspan>
            </text>
          </svg>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center flex-1 px-16">
          {/* Text Header */}
          <div className="flex w-[399px] flex-col justify-center items-start gap-3 mb-10">
            <h1 className="text-[40px] font-bold leading-[110%] tracking-[-1.6px] text-[#232323] font-inter">
              Sign in
            </h1>
            <p className="self-stretch text-lg leading-[150%] text-[#969696] font-inter">
              Please login to continue to your account.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="relative">
              <div className="flex w-[399px] px-4 py-4 items-center gap-[2px] border-[1.5px] border-[#367AFF] rounded-[10px]">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="flex-1 text-lg leading-[150%] text-[#232323] bg-transparent outline-none font-inter"
                />
                <span className="text-lg leading-[150%] text-[#232323] font-light font-inter">
                  |
                </span>
              </div>
              <div className="absolute left-4 -top-2 flex px-1 items-center gap-[10px] bg-white">
                <span className="text-sm leading-[150%] text-[#367AFF] font-inter font-medium">
                  Email
                </span>
              </div>
            </div>

            {/* OTP Input */}
            <div className="relative">
              <div className="flex w-[399px] px-4 py-4 justify-center items-center gap-[10px] border border-[#D9D9D9] rounded-[10px]">
                <input
                  type="text"
                  placeholder="OTP"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  className="flex-1 text-lg leading-[150%] text-[#9A9A9A] bg-transparent outline-none font-inter placeholder:text-[#9A9A9A]"
                />
                <EyeOff className="w-6 h-6 text-[#9A9A9A] flex-shrink-0" />
              </div>
            </div>

            {/* Resend OTP Link */}
            <button
              onClick={handleResendOtp}
              className="self-start text-base leading-[150%] text-[#367AFF] font-medium underline font-inter hover:text-[#2968cc] transition-colors"
            >
              Resend OTP
            </button>

            {/* Keep me logged in */}
            <div className="inline-flex items-center gap-[10px] mb-5">
              <div
                className="w-6 h-6 border-2 border-black rounded cursor-pointer flex items-center justify-center"
                onClick={() =>
                  setFormData({ ...formData, keepLoggedIn: !formData.keepLoggedIn })
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7.79997C3 6.11981 3 5.27973 3.32698 4.638C3.6146 4.07351 4.07354 3.61457 4.63803 3.32695C5.27976 2.99997 6.11984 2.99997 7.8 2.99997H16.2C17.8802 2.99997 18.7202 2.99997 19.362 3.32695C19.9265 3.61457 20.3854 4.07351 20.673 4.638C21 5.27973 21 6.11981 21 7.79997V16.2C21 17.8801 21 18.7202 20.673 19.3619C20.3854 19.9264 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9264 3.32698 19.3619C3 18.7202 3 17.8801 3 16.2V7.79997Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-base leading-[150%] text-[#232323] font-medium font-inter">
                Keep me logged in
              </span>
            </div>

            {/* Form Actions */}
            <div className="flex w-[399px] flex-col items-start gap-[30px]">
              {/* Sign in Button */}
              <button

                onClick={handleSignIn}
                className="flex h-[54px] px-2 py-4 justify-center items-center gap-2 self-stretch bg-[#367AFF] rounded-[10px] hover:bg-[#2968cc] transition-colors"
              >
                <span className="text-lg leading-[120%] tracking-[-0.18px] text-white font-semibold font-inter">
                  Sign in
                </span>
              </button>

              {/* Google Sign-in Button */}
              <button
                onClick={() => {
                  // TODO: Connect to backend for Google OAuth
                  console.log('Google sign-in clicked');
                }}
                className="flex h-[54px] px-2 py-4 justify-center items-center gap-3 self-stretch border border-[#367AFF] rounded-[10px] hover:bg-blue-50 transition-colors"
                type="button"
              >
                <span className="flex items-center justify-center w-7 h-7">
                  {/* Google SVG */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_17_40)">
                      <path d="M23.766 12.276c0-.818-.074-1.597-.212-2.344H12.24v4.437h6.484a5.54 5.54 0 01-2.4 3.637v3.017h3.877c2.27-2.09 3.565-5.17 3.565-8.747z" fill="#4285F4"/>
                      <path d="M12.24 24c3.24 0 5.963-1.07 7.95-2.91l-3.877-3.017c-1.08.726-2.457 1.16-4.073 1.16-3.13 0-5.78-2.11-6.73-4.946H1.53v3.09A11.997 11.997 0 0012.24 24z" fill="#34A853"/>
                      <path d="M5.51 14.287a7.19 7.19 0 010-4.574v-3.09H1.53a12.002 12.002 0 000 10.754l3.98-3.09z" fill="#FBBC05"/>
                      <path d="M12.24 7.577c1.77 0 3.35.61 4.6 1.81l3.44-3.44C18.2 3.77 15.48 2.7 12.24 2.7A11.997 11.997 0 001.53 7.623l3.98 3.09c.95-2.836 3.6-4.946 6.73-4.946z" fill="#EA4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_17_40">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className="text-lg leading-[120%] tracking-[-0.18px] text-[#232323] font-semibold font-inter">
                  Sign in with Google
                </span>
              </button>

              {/* Create Account Link */}
              <div className="self-stretch text-center">
                <span className="text-lg leading-[150%] text-[#6C6C6C] font-inter">
                  Need an account?{" "}
                </span>
                <a
                  href="/"
                  className="text-lg leading-[150%] text-[#367AFF] font-semibold underline font-inter hover:text-[#2968cc] transition-colors"
                >
                  Create one
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="flex w-[849px] p-3 items-start gap-[10px] flex-shrink-0 self-stretch">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/8680fe6f6a10b0c6ecd5ddac26e1f79b1a13bdd6?width=1650"
          alt=""
          className="flex flex-col justify-center items-center gap-8 flex-1 self-stretch rounded-[24px] object-cover"
        />
      </div>
    </div>
  );
}
