import { AlignLeft, X, Home, Trash2, List } from "lucide-react";
import $isClicked from "@/store/Nav";
import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Navigation = () => {
  const isClicked = useStore($isClicked);
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("light");
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleChange = () => {
    if (theme === "dark") {
      setThemeState("light");
    } else {
      setThemeState("dark");
    }
  };

  useEffect(() => {
    setThemeState("dark");
  }, []);

  return (
    <Card
      onClick={() => $isClicked.set(!isClicked)}
      className="size-10 flex justify-center items-center absolute left-5 top-5 rounded-full border-2"
    >
      {isClicked ? <AlignLeft /> : <X />}
      <Card
        style={{
          transform: isClicked ? "scale(0)" : "scale(1)",
          transformOrigin: "top left",
        }}
        className="top-10 rounded flex justify-center  items-center  flex-col left-6 absolute p-2 gap-y-2"
      >
        <a className="w-full flex justify-center items-center " href="/">
          <Home className="mx-2" />
          <Button className="py-1 w-20">/Home</Button>
        </a>
        <a className="w-full flex justify-center items-center " href="/todos">
          <List className="mx-2" />
          <Button className="py-1 w-20">/Todos</Button>
        </a>
        <a className="w-full flex justify-center items-center " href="/bin">
          <Trash2 className="mx-2" />
          <Button className="py-1 w-20">/bin</Button>
        </a>
        <Card className="w-full py-1 flex justify-center items-center ">
          <Switch
            onCheckedChange={handleChange}
            checked={theme === "dark" ? true : false}
            className="mx-1"
            id="theme"
          />
          <Label className="py-1 w-20 text-center" htmlFor="theme">
            {theme === "dark" ? "Dark" : "Light"}
          </Label>
        </Card>
      </Card>
    </Card>
  );
};

export default Navigation;
