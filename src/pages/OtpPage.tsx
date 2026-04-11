import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useI18n } from "@/lib/i18n";

export default function OtpPage() {
  const { t } = useI18n();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8 text-center"
      >
        <div className="space-y-2">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold">{t("auth.otp.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("auth.otp.subtitle")} <span className="font-medium text-foreground">+255 7** *** **8</span>
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="h-12 w-12 rounded-xl text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={() => navigate("/kyc")}
          disabled={otp.length < 6}
          className="w-full h-12 rounded-xl gradient-primary text-primary-foreground border-0 text-sm font-semibold"
        >
          {t("auth.otp.verify")}
        </Button>

        <p className="text-xs text-muted-foreground">
          {t("auth.otp.resend")}{" "}
          <button className="text-primary font-medium hover:underline">0:30</button>
        </p>
      </motion.div>
    </div>
  );
}
