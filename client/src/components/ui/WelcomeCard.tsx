import * as React from "react";

interface WelcomeCardProps {
  userName: string;
  email: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName,
  email,
}) => {
  return (
    <section className="flex absolute left-4 top-20 justify-center items-center p-4 max-w-full bg-white rounded-xl border border-solid shadow-sm border-zinc-300 h-[130px] w-[calc(100%_-_32px)] max-md:max-w-full max-sm:top-32 max-sm:max-w-[343px] max-sm:w-[calc(100%_-_32px)]">
      <div className="text-base leading-10 flex-[1_0_0] text-neutral-800">
        <h2 className="mb-2 text-2xl font-bold">Welcome, {userName} !</h2>
        <p>Email: {email}</p>
      </div>
    </section>
  );
};
