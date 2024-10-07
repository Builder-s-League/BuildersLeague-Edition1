import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

const topics = [
  {
    id: '670300d48a63d8bfe235b6ba',
    title: 'Introduction to React',
    description:
      'Learn the basics of React, including components, props, and state.',
    contentsQuantity: 10,
    percentage: 75,
  },
  {
    title: 'Advanced JavaScript Concepts',
    description:
      'Dive deep into closures, prototypes, and asynchronous programming.',
    contentsQuantity: 15,
    percentage: 60,
  },
  {
    title: 'CSS Grid and Flexbox',
    description:
      'Master modern CSS layout techniques for responsive web design.',
    contentsQuantity: 8,
    percentage: 90,
  },
  {
    title: 'TypeScript Fundamentals',
    description:
      'Get started with TypeScript and learn how to use static typing in your projects.',
    contentsQuantity: 12,
    percentage: 40,
  },
]

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Topics List</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, index) => (
          <Link key={index} href={`/emp/topic/${topic.id}`}>
            <Card className="flex flex-col hover:bg-gray-100">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col justify-between">
                <p className="mb-4 text-sm text-muted-foreground">
                  {topic.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Contents: {topic.contentsQuantity}</span>
                    <span>{topic.percentage}% Complete</span>
                  </div>
                  <Progress value={topic.percentage} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
