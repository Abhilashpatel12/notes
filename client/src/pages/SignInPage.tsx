
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { Eye, EyeOff } from 'lucide-react';

const SignInPage = () => {
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [email, setEmail] = useState('jonas_kahnwald@gmail.com');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, countdown]);

  const startTimer = () => {
    setCountdown(60);
    setIsTimerActive(true);
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) return setError('Email is required');
    setError('');
    try {
      await authService.sendLoginOtp({ email });
      startTimer();
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    }
  };

  const handleResendOtp = async () => {
    if (isTimerActive) return;
    try {
      await authService.sendLoginOtp({ email });
      startTimer();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.verifyLoginOtp({ email, otp });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email);
      
      // If user data is returned from the API, store it
      if (response.data.user) {
        localStorage.setItem('userName', response.data.user.name || email.split('@')[0]);
      } else {
        // Fallback to using email username as name
        localStorage.setItem('userName', email.split('@')[0]);
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    }
  };

  return (
    // Match SignUp page layout - container with margins and rounded corners
    <div className="flex w-full max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] min-h-[600px] mx-auto bg-white rounded-[32px] overflow-hidden">
      
      {/* Left Column - Form */}
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
            <path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF" />
            <path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF" />
            <path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF" />
            <path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF" />
            <path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF" />
            <path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF" />
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
          {/* Title Section */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[40px] font-bold leading-[110%] tracking-[-1.6px] text-[#232323]">
              Sign in
            </h1>
            <p className="text-lg leading-[150%] text-[#969696]">
              Please login to continue to your account.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Form Inputs */}
          <div className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={step === 2}
                className={`w-full h-[50px] md:h-[59px] px-4 border-[1.5px] rounded-[10px] text-[16px] md:text-[18px] text-[#232323] leading-[150%] outline-none ${step === 1 ? 'border-[#367AFF]' : 'border-[#D9D9D9] bg-[#f9f9f9] cursor-not-allowed'}`}
              />
              <label className={`absolute -top-2.5 left-4 bg-white px-1 text-[14px] font-medium ${step === 1 ? 'text-[#367AFF]' : 'text-[#9A9A9A]'}`}>Email</label>
              {step === 1 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#232323]">|</span>
              )}
            </div>

            {/* OTP Input */}
            {step === 2 && (
              <div className="relative">
                <input
                  type={showOtp ? 'text' : 'password'}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full h-[50px] md:h-[59px] px-4 border border-[#367AFF] rounded-[10px] text-[16px] md:text-[18px] text-[#232323] leading-[150%] outline-none placeholder:text-[#9A9A9A]"
                />
                <button
                  type="button"
                  onClick={() => setShowOtp(!showOtp)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showOtp ? (
                    <Eye className="w-6 h-6 text-[#9A9A9A]" />
                  ) : (
                    <EyeOff className="w-6 h-6 text-[#9A9A9A]" />
                  )}
                </button>
              </div>
            )}

            {/* Resend OTP */}
            {step === 2 && (
              <div className="text-right">
                {isTimerActive ? (
                  <span className="text-[14px] text-[#6C6C6C]">Resend OTP in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[16px] text-[#367AFF] font-medium underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            )}

            {/* Keep me logged in */}
            {step === 2 && (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                  className="w-6 h-6 border-2 border-black rounded-[4px] flex items-center justify-center"
                >
                  {keepLoggedIn && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L5 9L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-[16px] text-[#232323] font-medium">Keep me logged in</span>
              </div>
            )}

            {/* Action Button */}
            <button
              className="flex w-[399px] h-[54px] px-2 py-4 justify-center items-center gap-[10px] bg-[#367AFF] rounded-[10px] text-white text-[16px] md:text-[18px] font-semibold tracking-[-0.18px] leading-[120%] hover:bg-[#2563eb] transition-colors"
              type="button"
              onClick={step === 1 ? handleSendOtp : handleVerifyOtp}
            >
              {step === 1 ? 'Send OTP' : 'Sign in'}
            </button>

            {/* Google Sign-in */}
            <button
              onClick={() => { window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`; }}
              className="flex w-[399px] h-[54px] px-2 py-4 justify-center items-center gap-3 border border-[#367AFF] rounded-[10px] hover:bg-blue-50 transition-colors"
              type="button"
            >
              <span className="flex items-center justify-center w-7 h-7">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_17_40)">
                    <path d="M23.766 12.276c0-.818-.074-1.597-.212-2.344H12.24v4.437h6.484a5.54 5.54 0 01-2.4 3.637v3.017h3.877c2.27-2.09 3.565-5.17 3.565-8.747z" fill="#4285F4" />
                    <path d="M12.24 24c3.24 0 5.963-1.07 7.95-2.91l-3.877-3.017c-1.08.726-2.457 1.16-4.073 1.16-3.13 0-5.78-2.11-6.73-4.946H1.53v3.09A11.997 11.997 0 0012.24 24z" fill="#34A853" />
                    <path d="M5.51 14.287a7.19 7.19 0 010-4.574v-3.09H1.53a12.002 12.002 0 000 10.754l3.98-3.09z" fill="#FBBC05" />
                    <path d="M12.24 7.577c1.77 0 3.35.61 4.6 1.81l3.44-3.44C18.2 3.77 15.48 2.7 12.24 2.7A11.997 11.997 0 001.53 7.623l3.98 3.09c.95-2.836 3.6-4.946 6.73-4.946z" fill="#EA4335" />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className="text-base md:text-lg leading-[120%] tracking-[-0.18px] text-[#232323] font-semibold font-inter">Sign in with Google</span>
            </button>
          </div>

          {/* Create Account Link */}
          <div className="text-center flex flex-col items-center gap-2 mt-6">
            <span className="text-lg leading-[150%] text-[#6C6C6C] font-inter">
              Need an account?
            </span>
            <Link
              to="/signup"
              className="text-lg leading-[150%] text-[#367AFF] font-semibold underline font-inter hover:text-[#2968cc] transition-colors"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="flex w-[849px] p-3 items-start gap-[10px] flex-shrink-0 self-stretch">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/8680fe6f6a10b0c6ecd5ddac26e1f79b1a13bdd6?width=1650"
          alt="Abstract background"
          className="flex flex-col justify-center items-center gap-8 flex-1 self-stretch rounded-[24px] object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
