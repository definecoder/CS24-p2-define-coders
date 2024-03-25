import AppLogo from "../../login/AppLogo";
import ForgetPassInitiateForm from "./forgetPasswordConfirm";

export default function LoginPage() {
  return (
    <>
      <div className="w-full grid lg:min-h-[600px] grid-cols-1 xl:min-h-[800px]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="mt-16 lg:mt-0 flex gap-8 text-left items-center">              
            <div className="w-[25%]">
                <AppLogo />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-muted-foreground">
                  Check your email for the OTP
                </p>
              </div>              
            </div>
            <ForgetPassInitiateForm />
            <div className="mt-4 text-center text-sm">
              Designed & Developed by Define Coders &copy; 2024
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
