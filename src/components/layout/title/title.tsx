interface Props {
  title: string
}

export const Title = ({ title }: Props) => {
  return <h2 className='font-semibold text-2xl'>{title}</h2>
}
