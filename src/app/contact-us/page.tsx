import EmployeeBottomNavBar from '@/components/EmployeeBottomNavBar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Contact() {
  return (
    <>
      <div className="m-auto flex flex-col items-center gap-8">
        <h1 className="text-4xl font-medium leading-none">Contact us</h1>
        <div className="flex flex-col items-center">
          <p className="text-m text-muted-foreground">
            Want to renew/cancel subscription?
          </p>
          <p className="text-m text-muted-foreground">
            Here is our contact information:
          </p>

          <Separator className="mt-2" />
          <div className="flex h-8 w-full items-center space-x-4 text-sm">
            <div className="flex h-4 w-1/2 justify-end">Email address</div>
            <Separator orientation="vertical" />
            <div className="flex h-4 w-1/2 justify-start">Contact Number</div>
          </div>
        </div>

        <Button>
          <a href="./">Go back</a>
        </Button>
      </div>
      <EmployeeBottomNavBar />
    </>
  )
}
