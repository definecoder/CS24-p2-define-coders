import AppLogo from "./AppLogo";
import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <>
      <div className="w-full grid lg:min-h-[600px] grid-cols-1 xl:min-h-[800px]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="mt-16 lg:mt-0 flex gap-6 text-right items-center">
              <div className="w-1/2">
                <AppLogo />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email & password to login into your account
                </p>
              </div>
            </div>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Designed & Developed by Define Coders &copy; 2024
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
