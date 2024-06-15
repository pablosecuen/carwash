interface ArticleProps {
  title: string
  description: string
  urlVideo: string
  id: string
}

export const Article = ({ title, urlVideo, description, id }: ArticleProps) => {
  return (
    <article id={id} className='mx-auto flex  w-full flex-col gap-5 pt-20'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='opacity-80'>{description}</p>
      <iframe
        width='100%'
        height='100%'
        src={urlVideo}
        title='Aprendamos 2024 #3 - ELO 1000 - Apertura de arqueros'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        className='h-[600px] w-full rounded-lg'
      ></iframe>
    </article>
  )
}
