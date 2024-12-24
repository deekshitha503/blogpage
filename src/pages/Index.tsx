import { BlogHeader } from "@/components/BlogHeader";
import { BlogCard } from "@/components/BlogCard";

// Temporary mock data
const MOCK_POSTS = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a new React project with TypeScript and understand the basics of type-safe component development.",
    author: "Sarah Johnson",
    date: "Mar 15, 2024",
    likes: 42
  },
  {
    id: "2",
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt: "Explore the upcoming trends and technologies that will shape the web development landscape in 2024 and beyond.",
    author: "Michael Chen",
    date: "Mar 14, 2024",
    likes: 38
  },
  {
    id: "3",
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt: "A comprehensive guide to creating beautiful, responsive layouts using Tailwind CSS utility classes.",
    author: "Emma Wilson",
    date: "Mar 13, 2024",
    likes: 55
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;