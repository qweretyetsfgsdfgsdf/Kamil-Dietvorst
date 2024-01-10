import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getPlaiceholder } from 'plaiceholder';

const baseDir = path.join(process.cwd(), './posts/');

export interface Post {
  source: MDXRemoteSerializeResult;
  data: { [key: string]: any };
  content: string;
}

const getPosts = async (dir: string): Promise<Post[]> => {
  const baseUrl = path.join(path.join(baseDir, dir), '/');

  if (dir == "projects") {
    const projects = [
        "RabbitMart",
        "TalkEasy",
        "LMS",
        "BoxShop",
    ];
    return Promise.all(
      projects.map(async (project) => {
        const baseName = project + '.mdx';
        const slug = baseName.replace('.mdx', '');
        const raw = fs.readFileSync(baseUrl + baseName, 'utf8');
        const { data, content } = matter(raw);
  
        data.slug = slug;
  
        if (data.image) {
          const { base64 } = await getPlaiceholder(data.image);
          data.blurImage = base64;
        }
  
        const source = await serialize(content, {
          scope: data,
        });
  
        return { data, content: content.trim(), source };
      }),
    );
  }

  else {
      const experiences = [ "Mavlers", "Scalo", "Wiserbrand", "S-PRO" ];
      return Promise.all(
        experiences.map(async (experience) => {

        const baseName = experience + '.mdx';
        const slug = baseName.replace('.mdx', '');
        const raw = fs.readFileSync(baseUrl + baseName, 'utf8');
        const { data, content } = matter(raw);

        data.slug = slug;
  
        if (data.image) {
          const { base64 } = await getPlaiceholder(data.image);
          data.blurImage = base64;
        }
  
        const source = await serialize(content, {
          scope: data,
        });

        return { data, content: content.trim(), source };

      }),
    );
  }
};

export { getPosts };
