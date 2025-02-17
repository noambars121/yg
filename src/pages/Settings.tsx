import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Moon, Vibrate, Globe, LogOut } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useNotificationPermission } from "@/lib/hooks/useNotificationPermission";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const SettingSwitch = ({ label, checked, onChange, Icon }) => (
  <div className="flex items-center justify-between flex-row-reverse">
    <Switch checked={checked} onCheckedChange={onChange} />
    <div className="flex items-center gap-2">
      <Label>{label}</Label>
      <Icon className="h-5 w-5" />
    </div>
  </div>
);

export default function Settings() {
  const { user, updatePreferences, logout } = useAuth();
  const { permission, requestPermission } = useNotificationPermission();
  const { preferences } = user || {};
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const handleNotificationChange = useCallback(
    async (checked) => {
      if (checked && permission !== "granted") {
        const result = await requestPermission();
        if (result !== "granted") return;
      }
      try {
        await updatePreferences({ notifications: checked });
      } catch (error) {
        console.error("Failed to update notification preference:", error);
      }
    },
    [permission, requestPermission, updatePreferences],
  );

  const handlePreferenceChange = useCallback(
    async (key, checked) => {
      try {
        await updatePreferences({ [key]: checked });
      } catch (error) {
        console.error(`Failed to update ${key} preference:`, error);
      }
    },
    [updatePreferences],
  );

  const handleLanguageChange = useCallback(() => {
    const newLanguage = preferences?.language === "he" ? "en" : "he";
    updatePreferences({ language: newLanguage });
  }, [preferences, updatePreferences]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 ml-2 transform scale-x-[-1]" />
            התנתק
          </Button>
          <h1 className="text-2xl font-bold">הגדרות</h1>
        </div>

        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] group relative overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-right">התראות</h2>
            <div className="space-y-6">
              <SettingSwitch
                label="התראות על תנאי גלישה"
                checked={preferences?.notifications}
                onChange={handleNotificationChange}
                Icon={Bell}
              />
              <SettingSwitch
                label="רטט"
                checked={preferences?.vibration}
                onChange={(checked) =>
                  handlePreferenceChange("vibration", checked)
                }
                Icon={Vibrate}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] group relative overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-right">תצוגה</h2>
            <div className="space-y-6">
              <SettingSwitch
                label="מצב לילה"
                checked={preferences?.darkMode}
                onChange={(checked) =>
                  handlePreferenceChange("darkMode", checked)
                }
                Icon={Moon}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] group relative overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-right">שפה ואזור</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-row-reverse">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLanguageChange}
                >
                  {preferences?.language === "he" ? "English" : "עברית"}
                </Button>
                <div className="flex items-center gap-2">
                  <Label>
                    {preferences?.language === "he" ? "עברית" : "English"}
                  </Label>
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border border-white/5 rounded-3xl transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] group relative overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-right">אודות</h2>
            <div className="space-y-2 text-sm text-white/70 text-right">
              <p>גרסה 1.0.0</p>
              <p>© 2024 יש גלים?</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
