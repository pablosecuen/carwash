interface Props {
  title: string
}

export const Title = ({ title }: Props) => {
  return <h2 className='text-2xl font-semibold fade-in'>{title}</h2>
}
