import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root')({
  component: () => <div>Hello /_root!</div>
})