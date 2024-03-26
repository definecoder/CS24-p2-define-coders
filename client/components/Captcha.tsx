import { useState } from "react";
import { Input } from "./ui/input";

export default function CaptchaDiv({setCorrectCaptcha, setUserCaptcha}: {setCorrectCaptcha: Function, setUserCaptcha: Function}) {
    
    const [captcha, setCaptcha] = useState<string>("");

    const correct = "Captcha";
    setCorrectCaptcha(correct);
    
    return <>
        <div className="flex flex-col items-center">            
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbBR4xzTvp6jkXGx9Z-huy45TdHQ64AbD_zQfP9mlOTlqWHn6tKyH8Vocwvcl9HMdDoM&usqp=CAU"  className="w-[50%] mb-2" alt="captcha" />
            <Input
                id="captcha"
                type="text"
                placeholder="Enter the Captcha above"
                onChange={(e) => {
                    setUserCaptcha(e.target.value);
                    setCaptcha(e.target.value);
                }}
                value={captcha}
                required
            />
        </div>
    </> 
}
