import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  let session = await getServerSession(authOptions);
  return (
    <div className="list-bg">
      {result.map((item) => {
        return (
          <ListItem
            contentId={item._id.toString()}
            title={item.title}
            content={item.content}
            author={item.author ? item.author : null}
            session={session}
          />
        );
      })}
    </div>
  );
}
