import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Article } from './component/Article'
import { blogArticles } from './lib/data.blog'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function BlogPage() {
  return (
    <ContainerPage>
      <h1 className='text-start text-3xl font-bold'>Blog del sistema</h1>

      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-wrap py-20 md:mr-4 md:flex-col md:items-start'>
          {blogArticles.map(({ id, title }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={buttonVariants({
                variant: 'link'
              })}
            >
              {title}
            </Link>
          ))}
        </div>

        <section className='mx-auto grid max-w-4xl flex-1 gap-20 pb-12'>
          {blogArticles.map((article) => (
            <Article key={article.id} {...article} />
          ))}
        </section>
      </div>
    </ContainerPage>
  )
}
