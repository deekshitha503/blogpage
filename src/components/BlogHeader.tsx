import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BlogHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-blog-primary cursor-pointer"
          onClick={() => navigate("/")}
        >
          BlogSpace
        </h1>
        <Button 
          className="gap-2"
          onClick={() => navigate("/create")}
        >
          <PenSquare className="h-4 w-4" />
          Write Post
        </Button>
      </div>
    </header>
  );
};