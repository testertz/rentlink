import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, CreditCard, Heart, ChevronRight, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";

const steps = [
  { key: "personal", icon: User },
  { key: "id", icon: CreditCard },
  { key: "prefs", icon: Heart },
];

export default function KycPage() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6"
      >
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{t("auth.kyc.title")}</h1>
          <Progress value={progress} className="h-2 rounded-full" />
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1.5">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${
                  i <= step ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  {t(`auth.kyc.step${i + 1}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {step === 0 && (
              <>
                <Input placeholder="Date of Birth" type="date" className="rounded-xl h-12" />
                <Input placeholder="National ID / Passport" className="rounded-xl h-12" />
                <Input placeholder="City / Region" className="rounded-xl h-12" />
              </>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6 text-center space-y-3 border-dashed border-2 border-border">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium">Upload ID Document</p>
                  <p className="text-xs text-muted-foreground">National ID, Passport, or Driver's License</p>
                  <Button variant="outline" size="sm" className="rounded-xl">Choose File</Button>
                </div>
                <div className="glass-card rounded-2xl p-6 text-center space-y-3 border-dashed border-2 border-border">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium">Selfie Verification</p>
                  <p className="text-xs text-muted-foreground">Take a clear photo of yourself</p>
                  <Button variant="outline" size="sm" className="rounded-xl">Take Photo</Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">I'm looking for:</p>
                {["Apartment", "Room", "House", "Commercial"].map((item) => (
                  <button key={item} className="w-full glass-card rounded-xl p-3 text-left text-sm hover:border-primary/40 transition-colors">
                    {item}
                  </button>
                ))}
                <Input placeholder="Budget (TZS)" type="number" className="rounded-xl h-12" />
                <Input placeholder="Preferred Location" className="rounded-xl h-12" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Button onClick={handleNext} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground border-0 text-sm font-semibold gap-2">
          {step < steps.length - 1 ? t("auth.kyc.next") : t("auth.kyc.finish")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
