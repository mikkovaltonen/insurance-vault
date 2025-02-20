
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "en", name: "English", path: "/" },
  { code: "da", name: "Dansk", path: "/da" },
  { code: "fi", name: "Suomi", path: "/fi" },
  { code: "sv", name: "Svenska", path: "/sv" },
  { code: "et", name: "Eesti", path: "/et" },
  { code: "no", name: "Norsk", path: "/no" }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (langCode: string, path: string) => {
    i18n.changeLanguage(langCode);
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white min-w-[280px] w-[280px] p-2 z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code, lang.path)}
            className="cursor-pointer hover:bg-gray-100 px-10 py-2.5 w-full text-left whitespace-nowrap"
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
