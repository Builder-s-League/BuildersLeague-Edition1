'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader className="bg-muted pb-6">
            <CardTitle className="text-center text-3xl font-bold">
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-6 text-center text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              architecto laborum mollitia debitis rerum totam, aperiam
              blanditiis, ducimus repellat, neque non obcaecati aliquam quisquam
              dolores. Totam quod cupiditate non quis?
            </p>
            <div className="flex justify-center">
              <Link href="/setting/app-tour" passHref>
                <Button variant="outline">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help / App Tour
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
