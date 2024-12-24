import { BlogHeader } from "@/components/BlogHeader";
import { BlogCard } from "@/components/BlogCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  description: string;
  created_at: string;
  likes: number;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blogspace')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        console.log('Fetched posts:', data);
        // Convert the id to string before setting the state
        const formattedPosts = (data || []).map(post => ({
          ...post,
          id: post.id.toString()
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error("Failed to load posts. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">
            No posts yet. Be the first to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title || "Untitled"}
                excerpt={post.description || "No content"}
                author="Anonymous" // We can add user authentication later
                date={new Date(post.created_at).toLocaleDateString()}
                likes={post.likes || 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;