import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Shield, Scale, FileText, TrendingDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { updateUserPreferences, getUserPreferences } from "@/lib/userService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RiskAssessmentForm from "@/pages/RiskAssessmentForm";

const Workbench = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user?.uid) {
        try {
          const prefs = await getUserPreferences(user.uid);
          if (prefs?.language) {
            i18n.changeLanguage(prefs.language);
          }
        } catch (error) {
          console.error('Error loading preferences:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserPreferences();
  }, [user, i18n]);

  const handleLanguageChange = async (language: string) => {
    if (user?.uid) {
      try {
        await updateUserPreferences(user.uid, { language });
        i18n.changeLanguage(language);
        toast.success("Language preference saved");
      } catch (error) {
        toast.error("Failed to save language preference");
      }
    }
  };

  // Protect this route
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-gray-900">Insurance Workbench</h1>
            <div className="flex items-center gap-2 ml-4 text-gray-600">
              <User className="h-5 w-5" />
              <span>{user?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={i18n.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fi">Suomi</SelectItem>
                <SelectItem value="sv">Svenska</SelectItem>
                <SelectItem value="et">Eesti</SelectItem>
                <SelectItem value="da">Dansk</SelectItem>
                <SelectItem value="no">Norsk</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="preferences"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 py-3"
            >
              <Shield className="h-5 w-5" />
              <span>Safety & Preferences</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="comparison"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 py-3"
            >
              <Scale className="h-5 w-5" />
              <span>Proposal Comparison</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="documents"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 py-3"
            >
              <FileText className="h-5 w-5" />
              <span>Document Storage</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="optimization"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 py-3"
            >
              <TrendingDown className="h-5 w-5" />
              <span>Cost Reduction</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">My Safety Benefit/Cost Preferences</h2>
            <RiskAssessmentForm />
          </TabsContent>

          <TabsContent value="comparison" className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Insurance Proposal Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add comparison tools */}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Insurance Document Storage</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* Add document management interface */}
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Continuous Cost Reduction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add cost optimization tools */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workbench; 