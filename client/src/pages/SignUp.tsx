import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, EyeOff } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [formData, setFormData] = useState({
    name: "Jonas Khanwald",
    dateOfBirth: "11 December 1997",
    email: "jonas_kahnwald@gmail.com",
    otp: "",
  });

  const handleGetOtp = () => {
    setShowOtpField(true);
  };

  const handleSignUp = () => {
    // Handle final sign up
    console.log("Sign up with:", formData);
    // Navigate to dashboard after sign up
    navigate("/dashboard");
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
        <div className="flex flex-col justify-center flex-1 px-16 gap-8">
          {/* Text Header */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[40px] font-bold leading-[110%] tracking-[-1.6px] text-[#232323]">
              Sign up
            </h1>
            <p className="text-lg leading-[150%] text-[#969696]">
              Sign up to enjoy the feature of HD
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Name Input */}
            <div className="relative">
              <div className="flex w-[399px] px-4 py-4 items-center gap-[2px] border-[1.5px] border-[#D9D9D9] rounded-[10px]">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full text-lg leading-[150%] text-[#232323] bg-transparent outline-none font-inter"
                />
              </div>
              <div className="absolute left-4 -top-2 flex px-1 items-center gap-[10px] bg-white">
                <span className="text-sm leading-[150%] text-[#9A9A9A] font-inter font-medium">
                  Your Name
                </span>
              </div>
            </div>

            {/* Date of Birth Input */}
            <div className="relative">
              <div className="flex w-[399px] px-4 py-4 items-center gap-[10px] border-[1.5px] border-[#D9D9D9] rounded-[10px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M21 9.99997H3M16 1.99997V5.99997M8 1.99997V5.99997M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9264 20.673 20.3619C21 19.7202 21 18.8801 21 17.2V8.79997C21 7.11981 21 6.27973 20.673 5.638C20.3854 5.07351 19.9265 4.61457 19.362 4.32695C18.7202 3.99997 17.8802 3.99997 16.2 3.99997H7.8C6.11984 3.99997 5.27976 3.99997 4.63803 4.32695C4.07354 4.61457 3.6146 5.07351 3.32698 5.638C3 6.27973 3 7.11981 3 8.79997V17.2C3 18.8801 3 19.7202 3.32698 20.3619C3.6146 20.9264 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                    stroke="#232323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="flex-1 text-lg leading-[150%] text-[#232323] bg-transparent outline-none font-inter"
                />
              </div>
              <div className="absolute left-4 -top-2 flex px-1 items-center gap-[10px] bg-white">
                <span className="text-sm leading-[150%] text-[#9A9A9A] font-inter font-medium">
                  Date of Birth
                </span>
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <div
                className={`flex w-[399px] px-4 py-4 items-center gap-[2px] border-[1.5px] rounded-[10px] ${
                  !showOtpField ? "border-[#367AFF]" : "border-[#D9D9D9]"
                }`}
              >
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="flex-1 text-lg leading-[150%] text-[#232323] bg-transparent outline-none font-inter"
                />
                {!showOtpField && (
                  <span className="text-lg leading-[150%] text-[#232323] font-light font-inter">
                    |
                  </span>
                )}
              </div>
              <div className="absolute left-4 -top-2 flex px-1 items-center gap-[10px] bg-white">
                <span
                  className={`text-sm leading-[150%] font-inter font-medium ${
                    !showOtpField ? "text-[#367AFF]" : "text-[#9A9A9A]"
                  }`}
                >
                  Email
                </span>
              </div>
            </div>

            {/* OTP Input (conditional) */}
            {showOtpField && (
              <div className="relative">
                <div className="flex w-[399px] px-4 py-4 justify-center items-center gap-[10px] border border-[#367AFF] rounded-[10px]">
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
            )}

            {/* Submit Button */}
            <button
              onClick={showOtpField ? handleSignUp : handleGetOtp}
              className="flex w-[399px] px-2 py-4 justify-center items-center gap-2 bg-[#367AFF] rounded-[10px] hover:bg-[#2968cc] transition-colors"
            >
              <span className="text-lg leading-[120%] tracking-[-0.18px] text-white font-semibold font-inter">
                {showOtpField ? "Sign up" : "Get OTP"}
              </span>
            </button>
          </div>

          {/* Bottom Link */}
          <div className="text-center">
            <span className="text-lg leading-[150%] text-[#6C6C6C] font-inter">
              Already have an account??{" "}
            </span>
            <a
              href="/signin"
              className="text-lg leading-[150%] text-[#367AFF] font-semibold underline font-inter hover:text-[#2968cc] transition-colors"
            >
              Sign in
            </a>
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
