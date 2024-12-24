import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
}

export const BlogCard = ({ id, title, excerpt, author, date, likes: initialLikes }: BlogCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      
      const { error } = await supabase
        .from('blogspace')
        .update({ likes: newLikeCount })
        .eq('id', parseInt(id));

      if (error) throw error;

      setLikeCount(newLikeCount);
      setIsLiked(!isLiked);
      
      console.log('Like count updated:', newLikeCount);
    } catch (error) {
      console.error('Error updating like count:', error);
      toast.error("Failed to update like count");
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4">
        <h3 className="text-xl font-semibold line-clamp-2 hover:text-blog-primary cursor-pointer" 
            onClick={() => navigate(`/post/${id}`)}>
          {title}
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 line-clamp-3">{excerpt}</p>
        <div className="mt-4 text-sm text-gray-500">
          <span>{author}</span>
          <span className="mx-2">·</span>
          <span>{date}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={isBookmarked ? 'text-blog-accent' : ''}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};