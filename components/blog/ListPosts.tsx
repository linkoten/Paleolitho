import PostCard from "./PostCard";

interface Posts {
  id: string;
  title: string;  // Allow title to be null
  excerpt: string ;
  createdAt: Date;
  updatedAt: Date;
  coverImage: string;
  content: string
}

interface ListPostsProps {
  posts: Posts[];

}

function ListPosts({ posts }: ListPostsProps) {

  console.log(posts)
  return (
    <section className="p-3">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
        {posts.map((item, index) => (
          <PostCard key={index} item={item}  />
        ))}
      </div>
    </section>
  );
}

export default ListPosts;
