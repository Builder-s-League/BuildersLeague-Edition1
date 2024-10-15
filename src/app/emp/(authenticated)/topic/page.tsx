import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockTopics } from '@/mocks/topic'
import Link from 'next/link'

export default function Page() {
  const topics = mockTopics

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
                    <span>{topic.progress}% Complete</span>
                  </div>
                  <Progress value={topic.progress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
