import LinearProgressBar from '@/components/LinearProgressBar'
import TopicDetailItem from '@/components/TopicDetailItem'

interface TopicDetailPageProps {
  params: {
    id: string
  }
}
export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="h-40">
        <nav className="flex w-full flex-row justify-between">
          <button>Hamburguer</button>
          <button>Feedback</button>
        </nav>
      </div>
      <div className="flex w-full flex-col items-center">
        <LinearProgressBar value={66} max={100} />
        <p>66%</p>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <TopicDetailItem title="1. Introduction" status="Done" />
        <TopicDetailItem title="1. Introduction" status="Done" />
        <TopicDetailItem
          title="1. Introduction"
          status="Done"
          link={{
            href: 'https://google.com',
            date: new Date(),
          }}
        />
      </div>
    </div>
  )
}
