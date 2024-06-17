import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ArticleProps {
  title: string
  description: string
  urlVideo: string
  id: string
}

export const Article = ({ title, urlVideo, description, id }: ArticleProps) => {
  return (
    <Card id={id} className='mx-auto mt-20  flex w-full flex-col gap-5 bg-muted shadow-xl'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <iframe
          width='100%'
          height='100%'
          src={urlVideo}
          title='Aprendamos 2024 #3 - ELO 1000 - Apertura de arqueros'
          className='h-[600px] w-full rounded-lg'
        ></iframe>
      </CardContent>
    </Card>
  )
}
