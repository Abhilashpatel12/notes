import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('jonas_kahnwald@gmail.com');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  return (
    <div className="flex min-h-screen w-full max-w-[1440px] mx-auto border border-[#333] rounded-[32px] bg-white">
      {/* Left Column */}
      <div className="flex flex-col flex-1 p-8 lg:p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <svg
            width="79"
            height="32"
            viewBox="0 0 79 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
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
              d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z"
              fill="#367AFF"
            />
            <path
              d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z"
              fill="#367AFF"
            />
            <path
              d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z"
              fill="#367AFF"
            />
            <path
              d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z"
              fill="#367AFF"
            />
          </svg>
          <span className="text-[24px] font-semibold text-[#232323] font-[Inter] tracking-[-0.04em]">
            HD
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center max-w-[399px] mx-auto lg:mx-0 lg:ml-16">
          {/* Title and Subtitle */}
          <div className="mb-10">
            <h1 className="text-[40px] font-bold text-[#232323] leading-[110%] tracking-[-1.6px] mb-3">
              Sign in
            </h1>
            <p className="text-[18px] text-[#969696] leading-[150%]">
              Please login to continue to your account.
            </p>
          </div>

          {/* Email Input */}
          <div className="relative mb-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[59px] px-4 border-[1.5px] border-[#367AFF] rounded-[10px] text-[18px] text-[#232323] leading-[150%] outline-none"
            />
            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[14px] text-[#367AFF] font-medium">
              Email
            </label>
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#232323]">
              |
            </span>
          </div>

          {/* OTP Input */}
          <div className="relative mb-5">
            <input
              type={showOtp ? 'text' : 'password'}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full h-[59px] px-4 border border-[#D9D9D9] rounded-[10px] text-[18px] text-[#9A9A9A] leading-[150%] outline-none placeholder:text-[#9A9A9A]"
            />
            <button
              type="button"
              onClick={() => setShowOtp(!showOtp)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showOtp ? (
                <Eye className="w-6 h-6 text-[#9A9A9A]" />
              ) : (
                <EyeOff className="w-6 h-6 text-[#9A9A9A]" />
              )}
            </button>
          </div>

          {/* Resend OTP */}
          <button className="text-[16px] text-[#367AFF] font-medium underline text-left mb-6">
            Resend OTP
          </button>

          {/* Keep me logged in */}
          <div className="flex items-center gap-2.5 mb-8">
            <button
              onClick={() => setKeepLoggedIn(!keepLoggedIn)}
              className="w-6 h-6 border-2 border-black rounded-[4px] flex items-center justify-center"
            >
              {keepLoggedIn && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path
                    d="M1 5L5 9L13 1"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span className="text-[16px] text-[#232323] font-medium">
              Keep me logged in
            </span>
          </div>

          {/* Sign In Button */}
          <button className="w-full h-[54px] bg-[#367AFF] rounded-[10px] text-white text-[18px] font-semibold tracking-[-0.18px] leading-[120%] mb-8 hover:bg-[#2563eb] transition-colors">
            Sign in
          </button>

          {/* Create Account Link */}
          <p className="text-center text-[18px] leading-[150%]">
            <span className="text-[#6C6C6C]">Need an account? </span>
            <button className="text-[#367AFF] font-bold underline">
              Create one
            </button>
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden lg:flex w-[849px] flex-shrink-0 p-3">
        <div className="flex-1 rounded-[24px] overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/8680fe6f6a10b0c6ecd5ddac26e1f79b1a13bdd6?width=1650"
            alt="Abstract blue fluid design"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}