import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface WeatherAlertInfo {
  title: string;
  description: string;
  type: "warning" | "info";
}

interface WeatherAlertProps {
  alert: WeatherAlertInfo;
}

export default function WeatherAlert({ alert }: WeatherAlertProps) {
  return (
    <Alert
      variant={alert.type === "warning" ? "destructive" : "default"}
      className="bg-white/10 backdrop-blur-md border-white/20 transition-all duration-300 hover:shadow-lg animate-fade-in"
    >
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="text-lg font-bold mb-1">{alert.title}</AlertTitle>
      <AlertDescription className="text-white/80">
        {alert.description}
      </AlertDescription>
    </Alert>
  );
}
