import Image from "next/image";
import { ProjectsCard } from "../lib/interface";
import { client } from "../lib/sanity";

async function getData() {
  const query = `*[_type == 'project'] {
    title,
        _id,
        link,
        description,
        tags,
        "imageUrl": image.asset->url


        }`;

  const data = await client.fetch(query);

  return data;
}

export default async function ProjectsPage() {
  const data: ProjectsCard[] = await getData();
  return (
    <section className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">Projects</h1>
      <p className="leading-7 text-muted-foreground mt-2">
        Check out my projects
      </p>
      <div className="py-12 grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
        {data.map((item) => (
          <a
            href={item.link}
            key={item._id}
            className="group block"
            target="_blank"
          >
            <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl relative">
              <Image src={item.imageUrl} alt="Image Description"/>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}