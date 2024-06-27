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
        <video
          src={urlVideo}
          title={title}
          width={'900'}
          height={'240'}
          controls
          autoPlay={false}
        ></video>
      </CardContent>
    </Card>
  )
}
