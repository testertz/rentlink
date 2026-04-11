import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export default function SignupPage() {
  const { t } = useI18n();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto">
            <span className="text-xl font-bold text-primary-foreground">R</span>
          </div>
          <h1 className="text-2xl font-bold">{t("auth.signup")}</h1>
          <p className="text-sm text-muted-foreground">{t("auth.signupSubtitle")}</p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("auth.fullName")} className="pl-10 rounded-xl h-12" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("auth.email")} type="email" className="pl-10 rounded-xl h-12" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("auth.phone")} type="tel" className="pl-10 rounded-xl h-12" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("auth.password")}
              type={showPass ? "text" : "password"}
              className="pl-10 pr-10 rounded-xl h-12"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button
            onClick={() => navigate("/otp")}
            className="w-full h-12 rounded-xl gradient-primary text-primary-foreground border-0 text-sm font-semibold"
          >
            {t("auth.signup")}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-xs text-muted-foreground">{t("auth.or")}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 rounded-xl h-11 text-xs">Google</Button>
          <Button variant="outline" className="flex-1 rounded-xl h-11 text-xs">Apple</Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {t("auth.hasAccount")}{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">{t("auth.login")}</Link>
        </p>
      </motion.div>
    </div>
  );
}
